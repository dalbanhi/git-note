"use server";

import { PostType } from "~/types";
import { testPosts } from "~/constants";

export async function getPosts(filterType: PostType, tag: string) {
  if (filterType === undefined && tag === "") {
    return testPosts;
  } else if (filterType !== undefined) {
    let filtered = testPosts.filter((item) => {
      return filterType.toLowerCase() === item.type.toLowerCase();
    });

    return filtered;
  } else {
    let filteredByTag = testPosts.filter((item) => {
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
