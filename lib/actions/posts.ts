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

  const allPosts = await Note.distinct("tags", { creator: session?.user?.id });

  return allPosts;
}

export async function getPosts(filterType: PostType, tag: string) {
  await connectToDB();
  const session = await getSession();
  const sessionUser = session?.user;

  //get the posts of the user from teh database
  const filteredPosts = await Note.find({
    creator: sessionUser?.id,
    ...(filterType !== undefined && { type: filterType.toLowerCase() }),
    ...(tag !== "" && { tags: { $in: [tag] } }),
  });

  return filteredPosts;
}

export async function getPost(id: string) {
  await connectToDB();
  const session = await getSession();
  const sessionUser = session?.user;

  //get the post from the database
  console.log("getting post with id", id);
  try {
    const post = await Note.findOne({ _id: id });
    return post;
  } catch (err) {
    return null;
  }
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
