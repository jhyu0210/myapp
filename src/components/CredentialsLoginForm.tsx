// "use client";
// import React, { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { signIn } from "next-auth/react";
// import { toast } from "./ui/use-toast";

// const CredentialsLoginForm = () => {
//   const [email, setEmail] = useState<null | string>(null);
//   const [password, setPassword] = useState<null | string>(null);

//   const SignInWithCredentials = async () => {
//     // e.preventDefault();
//     console.log("signIn Data", email, password);
//     const signinResult = await signIn("Credentials", {
//       email: email,
//       password: password,
//       callbackUrl: `${window.location.origin}`,
//     });
//     if (!signinResult?.ok) {
//       return toast({
//         title: "this did not work",
//         description: "Something went worng, try again",
//         variant: "destructive",
//       });
//     }
//     return toast({
//       title: "Check your Credentials...",
//       description: "A magic link has been sent to you!",
//     });
//   };

//   return (
//     <form action={SignInWithCredentials}>
//       <h1 className="text-3xl font-semibold text-white">Log in</h1>
//       <div className="mt-5 space-y-4">
//         <Input
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="inline-block w-full bg-[#333] text-white placeholder:text-xs placeholder:text-gray-100"
//         />
//         <Input
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="inline-block w-full bg-[#333] text-white placeholder:text-xs placeholder:text-gray-100"
//         />
//         <Button type="submit" variant="link" className="w-full bg-[#bdb7fb]">
//           Log in with Email and Password
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default CredentialsLoginForm;
"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
// import GoogleSignInButton from '../GoogleSignInButton';

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const CredentailsLoginForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("Signin with :::", values);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!result?.ok) {
      toast({
        variant: "destructive",
        title: "Signin Failed, try again later...",
        description: "Credentials my be incorrect!",
      });
      return;
    }
    toast({
      title: "Successfuly Signed In",
      variant: "default",
    });
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    {...field}
                    className="text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton />
      <p className="mt-2 text-center text-sm text-gray-200">
        Don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/auth/signup">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default CredentailsLoginForm;
