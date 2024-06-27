"use server";

import { PostType, Note as TypeOfNote } from "~/types";

import { NoteSchema } from "~/lib/validators/note.schema";
import { connectToDB } from "~/utils/database";
import { getSession } from "~/auth/auth";
import Note, { INote } from "~/models/note";
import User from "~/models/user";
import { format } from "date-fns";

import { Contribution } from "~/types";

import { unstable_cache as cache, revalidateTag } from "next/cache";

async function _getAllUserTags(id: string) {
  try {
    await connectToDB();

    const allPosts = await Note.distinct("tags", { creator: id });

    return allPosts;
  } catch (err) {
    console.log(err);
    return null;
  }
}
const postsPerPage = 3;

async function _getTotalPages(id: string) {
  try {
    await connectToDB();

    const totalPosts = await Note.countDocuments({ creator: id });
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    return totalPages;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function _getPostsByPage(page: number, id: string) {
  try {
    await connectToDB();
    const limit = postsPerPage;

    //get the posts of the user from the database
    const posts = await Note.find({ creator: id })
      .skip((page - 1) * limit)
      .limit(limit);

    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function _getAllContributions(id: string) {
  try {
    await connectToDB();

    //get the posts of the user from the database
    const posts = await Note.find({ creator: id });

    let contributionsMap: { [key: string]: number } = {};

    posts.forEach((post) => {
      const createdAt = format(post.createdAt, "yyyy-MM-dd");
      const updatedAt = format(post.updatedAt, "yyyy-MM-dd");
      const dates = [createdAt, updatedAt];
      for (let date of dates) {
        if (contributionsMap[date]) {
          contributionsMap[date] += 1;
        } else {
          contributionsMap[date] = 1;
        }
      }
    });

    const contributions: Contribution[] = Object.keys(contributionsMap).map(
      (date, index) => ({
        id: index + 1,
        date: date,
        count: contributionsMap[date],
      })
    );

    return { userID: id, contributions: contributions };
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function _getAllOtherPosts(postIDs: string[], creatorID: string) {
  try {
    await connectToDB();

    //get the posts of the user from the database
    const posts = await Note.find({
      creator: creatorID,
      _id: { $nin: postIDs },
    });
    const postTitlesAndIDs = posts.map((post) => {
      return { title: post.title, id: post.id } as {
        title: string;
        id: string;
      };
    });

    return postTitlesAndIDs as { title: string; id: string }[];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateRelatedPosts(
  postID: string,
  relatedPostID: string
) {
  try {
    await connectToDB();

    //update the post with the related post
    const updatedPost = await Note.findOneAndUpdate(
      {
        _id: postID,
      },
      { $push: { relatedNotes: relatedPostID } },
      { new: true }
    ).populate("relatedNotes");

    //update the related post with the post
    await Note.findOneAndUpdate(
      {
        _id: relatedPostID,
      },
      { $push: { relatedNotes: postID } }
    );

    revalidateTag("posts");

    return JSON.stringify(updatedPost.relatedNotes);
  } catch (err) {
    console.log(err);
  }
}

async function _getPosts(filterType: PostType, tag: string, id: string) {
  try {
    await connectToDB();

    //get the posts of the user from the database
    const filteredPosts = await Note.find({
      creator: id,
      ...(filterType !== undefined && { type: filterType.toLowerCase() }),
      ...(tag !== "" && { tags: { $in: [tag] } }),
    });

    return filteredPosts;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function _getPost(id: string) {
  //get the post from the database
  try {
    await connectToDB();
    const post = await Note.findOne({ _id: id }).populate("relatedNotes");
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    return null;
  }
}

export async function deletePost(post: INote) {
  try {
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    if (!sessionUser) {
      throw new Error("You must be logged in to delete a post");
    }

    if (post.creator.toString() !== sessionUser.id) {
      throw new Error("You are not authorized to delete this post");
    }

    //delete the post from the database
    await Note.deleteOne({ _id: post._id });

    //delete the post from the user's notes
    await User.findOneAndUpdate(
      { _id: sessionUser.id },
      { $pull: { notes: post._id } }
    );
    revalidateTag("posts");
  } catch (err) {
    console.log(err);
  }
}

export async function updatePost(
  post: TypeOfNote,
  userID: string,
  oldNoteID: string,
  oldNoteCreatorID: string
) {
  try {
    NoteSchema.parse(post);
    await connectToDB();
    if (oldNoteCreatorID !== userID) {
      throw new Error("You are not authorized to update this post");
    }

    const updatedPost = await Note.findOneAndUpdate(
      { _id: oldNoteID },
      {
        ...post,
        tags: post.tags.map((tag: any) => tag.value),
        stepsToFollow: post.stepsToFollow?.map((step: any) => step.value),
        whatYouLearned: post.whatYouLearned?.map((learn: any) => learn.value),
      },
      { new: true }
    );
    const updatedPostID = updatedPost.id;
    revalidateTag("posts");
    return updatedPostID;
  } catch (err) {
    console.log(err);
  }
}

export async function createPost(post: TypeOfNote) {
  try {
    NoteSchema.parse(post);
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    if (!sessionUser) {
      throw new Error("You must be logged in to create a post");
    }
    const newPost: INote = await Note.create({
      ...post,
      tags: post.tags.map((tag: any) => tag.value),
      creator: sessionUser.id,
      stepsToFollow: post.stepsToFollow?.map((step: any) => step.value),
      whatYouLearned: post.whatYouLearned?.map((learn: any) => learn.value),
    });

    //update the user with the new post
    await User.findOneAndUpdate(
      { _id: sessionUser.id },
      { $push: { notes: newPost._id } }
    );
    revalidateTag("posts");
    return JSON.stringify(newPost._id);
  } catch (err) {
    console.log(err);
  }
}

export const getAllContributions = cache(
  _getAllContributions,
  ["get-all-contributions"],
  {
    tags: ["posts"],
  }
);

export const getPosts = cache(_getPosts, ["get-posts"], {
  tags: ["posts"],
});

export const getAllOtherPosts = cache(
  _getAllOtherPosts,
  ["get-all-other-posts"],
  { tags: ["posts"] }
);

export const getPost = cache(_getPost, ["get-post"], {
  tags: ["posts"],
});

export const getPostsByPage = cache(_getPostsByPage, ["get-posts-by-page"], {
  tags: ["posts"],
});

export const getTotalPages = cache(_getTotalPages, ["get-total-pages"], {
  tags: ["posts"],
});

export const getAllUserTags = cache(_getAllUserTags, ["get-all-user-tags"], {
  tags: ["posts"],
});
