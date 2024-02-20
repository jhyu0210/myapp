import React from "react";
import DeletePostButton from "./DeletePostButton";

interface PostcardProps {
  id: string;
  title: string;
  content: string | null;
  authorName: string | undefined | null;
}

const Postcard = (post: PostcardProps) => {
  return (
    <div className="p-2 my-4 border border-r-2 border-slate-200 bg-slate-200">
      <div>
        <h1 className="font-bold text-lg p-2">{post.title}</h1>
        <p>by {post.authorName}</p>
        <p>{post.content}</p>
        <DeletePostButton postId={post.id} />
      </div>
    </div>
  );
};

export default Postcard;
