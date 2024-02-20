"use client";
import React from "react";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

const DeletePostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  async function handleClick() {
    try {
      await fetch(
        `/api/post/${postId}`,

        { method: "DELETE" }
      );

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return <Button onClick={handleClick}>Delete Post</Button>;
};

export default DeletePostButton;
