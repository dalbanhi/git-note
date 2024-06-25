"use server";

import { PostType, Note as TypeOfNote } from "~/types";

import { NoteSchema } from "~/lib/validators/note.schema";
import { connectToDB } from "~/utils/database";
import { getSession } from "~/auth/auth";
import Note, { INote } from "~/models/note";
import User from "~/models/user";

import { unstable_cache as cache, revalidateTag } from "next/cache";

async function _getAllUserTags(id: string) {
  await connectToDB();

  const allPosts = await Note.distinct("tags", { creator: id });

  return allPosts;
}
const postsPerPage = 3;

async function _getTotalPages(id: string) {
  await connectToDB();

  const totalPosts = await Note.countDocuments({ creator: id });
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  return totalPages;
}

async function _getPostsByPage(page: number, id: string) {
  await connectToDB();
  const limit = postsPerPage;

  //get the posts of the user from the database
  const posts = await Note.find({ creator: id })
    .skip((page - 1) * limit)
    .limit(limit);

  return posts;
}

async function _getAllOtherPosts(postIDs: string[], creatorID: string) {
  await connectToDB();

  //get the posts of the user from the database
  const posts = await Note.find({
    creator: creatorID,
    _id: { $nin: postIDs },
  });
  const postTitlesAndIDs = posts.map((post) => {
    return { title: post.title, id: post.id } as { title: string; id: string };
  });

  return postTitlesAndIDs as { title: string; id: string }[];
}

async function _updateRelatedPosts(postID: string, relatedPostID: string) {
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

  return JSON.stringify(updatedPost.relatedNotes);
}

async function _getPosts(filterType: PostType, tag: string, id: string) {
  await connectToDB();

  //get the posts of the user from the database
  const filteredPosts = await Note.find({
    creator: id,
    ...(filterType !== undefined && { type: filterType.toLowerCase() }),
    ...(tag !== "" && { tags: { $in: [tag] } }),
  });

  return filteredPosts;
}

async function _getPost(id: string) {
  await connectToDB();

  //get the post from the database
  try {
    const post = await Note.findOne({ _id: id }).populate("relatedNotes");
    return post;
  } catch (err) {
    return null;
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
    const newPost = await Note.create({
      ...post,
      tags: post.tags.map((tag: any) => tag.value),
      creator: sessionUser.id,
      stepsToFollow: post.stepsToFollow?.map((step: any) => step.value),
      whatYouLearned: post.whatYouLearned?.map((learn: any) => learn.value),
    });

    //update the user with the new post
    await User.findOneAndUpdate(
      { _id: sessionUser.id },
      { $push: { notes: newPost.id } }
    );
    revalidateTag("posts");
    return newPost.id;
  } catch (err) {
    console.log(err);
  }
}

export const getPosts = cache(_getPosts, ["get-posts"], {
  tags: ["posts"],
});

export const getAllOtherPosts = cache(
  _getAllOtherPosts,
  ["get-all-other-posts"],
  { tags: ["posts"] }
);

export const updateRelatedPosts = cache(
  _updateRelatedPosts,
  ["update-related-posts"],
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
