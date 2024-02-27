"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSignInButton = () => {
  return (
    <div className=" text-white">
      <Button
        className="w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        <Image
          src="https://raw.githubusercontent.com/ski043/Nextjs-14-netflix-clone/main/public/google.svg"
          alt="google-icon"
          height={24}
          width={24}
        />
        Google Signin
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
