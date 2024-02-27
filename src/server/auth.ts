import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import googleProvider, { type GoogleProfile } from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import db from "@/server/db";
import * as bcrypt from "bcrypt";
// import { User } from "@prisma/client";
// // import { JWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

// declare module "next-auth" {
//   interface Session {
//     user: User;
//   }
// }
// declare module "next-auth/jwt" {
//   type JWT = User;
// }

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    googleProvider({
      name: "google",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // todo::: define type of profile
      profile(profile: GoogleProfile) {
        console.log("Google Profile::::", profile);
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          role: (profile.role ? profile.role : "user") as string,
          image: profile.picture,
        };
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        // console.log("authorizing credentials", credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const foundUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!foundUser) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          foundUser.password!,
        );
        // console.log("password Match:::", passwordMatch);
        if (!passwordMatch) {
          return null;
        }
        return {
          id: foundUser.id,
          email: foundUser.email,
        };
      },
    }),
  ],
} satisfies NextAuthOptions;

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
