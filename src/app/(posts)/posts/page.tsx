// import Post from "@/components/Post";
import Postcard from "@/components/Postcard";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import db from "@/server/db";
import Link from "next/link";
import React from "react";

const Posts = async () => {
  const posts = await db.post.findMany();
  const session = await getServerAuthSession();
  return (
    <div>
      {session ? (
        <div>
          <Button asChild>
            <Link href="/posts/add-post">Add New Post</Link>
          </Button>
        </div>
      ) : (
        ""
      )}
      <div>
        <h1>Feeds</h1>
        <p>{posts.length}</p>
        {posts.length > 0 ? (
          posts.map((post) => <Postcard key={post.id} post={post} />)
        ) : (
          <div>No Posts yet...</div>
        )}
      </div>
    </div>
  );
};

export default Posts;
