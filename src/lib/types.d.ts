import type { User } from "@prisma/client";
// import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  type JWT = User;
}

// declare module "google-profile" {
//   type GoogleProfile = {
//     sub: string;
//     given_name: string;
//     amily_name: string;
//     email: string;
//     role?: "user";
//     picture: string;
//   };
// }
