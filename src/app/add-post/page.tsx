"use client";
import { useSession } from "next-auth/react";
// import { headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { type FormEvent, useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data } = useSession();
  const authorId = data?.user.id;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted:", { title, content });

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }

    // Handle form submission logic here, e.g., send data to server
    // await prisma.post.create({data:})
    setTitle("");
    setContent("");
  };
  return (
    <div className="">
      <Link href="/">View Feed</Link>
      <h1>AddPost</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full border border-slate-300">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="w-full border border-slate-300">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="w-full border border-slate-300" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
