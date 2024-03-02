import React from "react";
import type { Post } from "@prisma/client";
import db from "@/server/db";
interface PostProps {
  post: Post;
}

const Post = async ({ post }: PostProps) => {
  if (!post.authorId) return;

  const authorNameOrEmail = await db.user.findUnique({
    where: {
      id: post.authorId,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return (
    <>
      {authorNameOrEmail &&
        (authorNameOrEmail.name ? (
          <div>{authorNameOrEmail.name}</div>
        ) : (
          <div>{authorNameOrEmail?.email}</div>
        ))}
    </>
  );
};

export default Post;
