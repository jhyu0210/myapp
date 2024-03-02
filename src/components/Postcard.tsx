import React from "react";
import DeletePostButton from "./DeletePostButton";
import db from "@/server/db";
import type { Post } from "@prisma/client";
import Image from "next/image";

interface PostcardProps {
  post: Post;
}

const Postcard = async ({ post }: PostcardProps) => {
  console.log("POST", post);
  // const authorNameOrEmail = { name: "jhyu", email: "" };
  if (!post || !post.authorId) return;
  const authorNameOrEmail = await db.user.findUnique({
    where: {
      id: post.authorId,
    },
    select: {
      name: true,
      email: true,
    },
  });
  console.log("authorNameOrEmail:[PostCard]", authorNameOrEmail);
  return (
    <div className="my-4 border border-r-2 border-slate-200 bg-slate-200 p-2">
      <div className="flex items-center justify-between">
        <Image
          src="https://st4.depositphotos.com/6903990/27898/i/450/depositphotos_278981062-stock-photo-beautiful-young-woman-clean-fresh.jpg"
          alt="post-image"
          width={100}
          height={100}
        />
        <div>
          <h1 className="p-2 text-lg font-bold">{post.title}</h1>

          {authorNameOrEmail &&
            (authorNameOrEmail.name ? (
              <p>by {authorNameOrEmail.name}</p>
            ) : (
              <p>{authorNameOrEmail?.email}</p>
            ))}
          <p>{post.content}</p>
          <DeletePostButton postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default Postcard;
