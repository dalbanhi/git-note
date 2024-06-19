"use server";

import { PostType, Note as TypeOfNote } from "~/types";

import { NoteSchema } from "~/lib/validators/note.schema";
import { connectToDB } from "~/utils/database";
import { getSession } from "~/auth/auth";
import Note from "~/models/note";
import User from "~/models/user";
import { NoteType } from "~/constants";

export async function getAllUserTags() {
  await connectToDB();
  const session = await getSession();
  const sessionUser = session?.user;

  //get the posts of teh user from teh database
  const allPosts = await Note.find({ creator: sessionUser?.id });

  let allTags: string[] = [];
  allPosts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });

  return allTags;
}

export async function getPosts(filterType: PostType, tag: string) {
  await connectToDB();
  const session = await getSession();
  const sessionUser = session?.user;

  //get the posts of teh user from teh database
  const allPosts = await Note.find({ creator: sessionUser?.id });

  if (filterType === undefined && tag === "") {
    return allPosts;
  } else if (filterType !== undefined) {
    let filtered = allPosts.filter((item) => {
      return filterType.toLowerCase() === item.type.toLowerCase();
    });

    return filtered;
  } else {
    let filteredByTag = allPosts.filter((item) => {
      let tagFound = false;
      for (let itemTag of item.tags) {
        if (itemTag.toLowerCase() === tag.toLowerCase()) {
          tagFound = true;
        }
      }
      return tagFound;
    });
    return filteredByTag;
  }
}

export async function getPost(id: string) {
  await connectToDB();
  const session = await getSession();
  const sessionUser = session?.user;

  //get the post from the database
  const post = await Note.findOne({ _id: id });
  return post;
}

export async function createPost(post: any) {
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
      creator: sessionUser.id,
    });

    //update the user with the new post
    await User.findOneAndUpdate(
      { _id: sessionUser.id },
      { $push: { notes: newPost.id } }
    );
  } catch (err) {
    console.log(err);
  }
}
