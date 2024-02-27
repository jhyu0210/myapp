import db from "@/server/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
// import { User } from "@prisma/client";
import * as z from "zod";

const UserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    // const body = await req.json();
    const { email, password } = UserSchema.parse(await req.json());

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log("User Exists??", existingUserByEmail);
    if (existingUserByEmail)
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 409 },
      );
    const hashedPassword = await hash(password, 10);
    console.log("hashedPassword:::", hashedPassword);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    console.log("db response:::", newUser);
    // const { password: newUserPassword, ...rest } = newUser; //do not return password
    return NextResponse.json(
      { user: newUser, message: "User created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.log("DB error on user create::", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
