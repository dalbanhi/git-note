"use client";
import React, { useEffect, useState } from "react";
import RelatedPosts from "./RelatedPosts";
import { usePathname } from "next/navigation";
import {
  getPost,
  getAllOtherPosts,
  updateRelatedPosts,
} from "~/lib/actions/posts";
import { INote } from "~/models/note";
import { NoteReference } from "~/types";
import OnThisPage from "./OnThisPage";

const PostNavigation = () => {
  const pathname = usePathname();
  //split string to get the last part of the url
  const splitPathname = pathname.split("/");
  const lastPart = splitPathname[splitPathname.length - 1];
  const [post, setPost] = useState<INote>();
  const [relatedPosts, setRelatedPosts] = useState<NoteReference[]>();
  const [allOtherPosts, setAllOtherPosts] = useState<NoteReference[]>();

  useEffect(() => {
    const getThePost = async () => {
      const post = await getPost(lastPart);
      setPost(post);
      if (post && post.relatedNotes) {
        const relatedPostsFromPost = post.relatedNotes.map((post: INote) => ({
          title: post.title,
          id: post._id,
        }));
        setRelatedPosts(relatedPostsFromPost);
      }
    };
    getThePost();
  }, [pathname, lastPart]);

  useEffect(() => {
    const getAllTheOtherPosts = async () => {
      if (post) {
        const relatedPosts = post.relatedNotes as unknown as string[];
        const relatedNotesPlusCurrent = relatedPosts.concat(post._id);
        const allOtherPosts = (await getAllOtherPosts(
          relatedNotesPlusCurrent,
          post.creator as unknown as string
        )) as unknown as { title: string; id: string }[];

        setAllOtherPosts(allOtherPosts);
      }
    };

    getAllTheOtherPosts();
  }, [post, relatedPosts]);

  async function addRelatedPost(postToAdd: string) {
    const updatedRelatedPostsJSON = await updateRelatedPosts(
      post?._id ?? "",
      postToAdd
    );
    const updatedRelatedPosts = JSON.parse(updatedRelatedPostsJSON);

    const relatedPostsFromUpdate = updatedRelatedPosts.map((post: INote) => ({
      title: post.title,
      id: post._id,
    }));
    setRelatedPosts(relatedPostsFromUpdate);
  }
  if (!pathname.includes("/note")) return null;

  return (
    <div className="flex flex-col gap-6">
      <RelatedPosts
        relatedPosts={relatedPosts}
        allOtherPosts={allOtherPosts}
        addRelatedPost={addRelatedPost}
      />
      <OnThisPage postContent={post?.content || ""} postType={post?.type} />
    </div>
  );
};

export default PostNavigation;
