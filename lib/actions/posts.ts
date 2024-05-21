"use server";

import { PostType } from "~/types";
import { testPosts } from "~/constants";

export async function getPosts(filterType: PostType) {
  let filtered = testPosts.filter((item) => {
    return filterType.toLowerCase() === item.type.toLowerCase();
  });

  return filtered;
}
