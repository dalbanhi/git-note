"use server";

import { PostType } from "~/types";

// import { testPosts } from "~/constants";
import { NoteSchema } from "~/lib/validators/note.schema";
import { connectToDB } from "~/utils/database";
import { getSession } from "~/auth/auth";
import Note from "~/models/note";
import User from "~/models/user";

export async function getPosts(filterType: PostType, tag: string) {
  // if (filterType === undefined && tag === "") {
  //   return testPosts;
  // } else if (filterType !== undefined) {
  //   let filtered = testPosts.filter((item) => {
  //     return filterType.toLowerCase() === item.type.toLowerCase();
  //   });

  //   return filtered;
  // } else {
  //   let filteredByTag = testPosts.filter((item) => {
  //     let tagFound = false;
  //     for (let itemTag of item.tags) {
  //       if (itemTag.toLowerCase() === tag.toLowerCase()) {
  //         tagFound = true;
  //       }
  //     }
  //     return tagFound;
  //   });
  //   return filteredByTag;
  // }
  return [];
}

export async function getPost(id: number) {
  return {};
  // const post = testPosts.find((post) => post.id === id);
  // return post;
}

export async function createPost(post: any) {
  try {
    console.log("Post created successfully");
    console.log("post", post);
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
    console.log(newPost);

    //update the user with the new post
    await User.findOneAndUpdate(
      { _id: sessionUser.id },
      { $push: { notes: newPost.id } }
    );
  } catch (err) {
    console.log(err);
  }
}
