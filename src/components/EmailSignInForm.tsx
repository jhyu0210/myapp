"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";

const EmailSignInForm = () => {
  const [email, setEmail] = useState<null | string>(null);

  const SignInWithEmail = async () => {

    const signinResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
    });
    if (!signinResult?.ok) {
      return toast({
        title: "this did not work",
        description: "Something went worng, try again",
        variant: "destructive",
      });
    }
    return toast({
      title: "Check your Email",
      description: "A magic link has been sent to you!",
    });
  };

  return (
    <form action={SignInWithEmail}>
      <h1 className="text-3xl font-semibold text-white">Log in</h1>
      <div className="mt-5 space-y-4">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          className="inline-block w-full bg-[#333] text-white placeholder:text-xs placeholder:text-gray-100"
        />
        <Button
          type="submit"
          variant="destructive"
          className="w-full bg-[#e50914]"
        >
          Log in with Email
        </Button>
      </div>
    </form>
  );
};

export default EmailSignInForm;
