import db from "@/server/db";
import { NextResponse } from "next/server";
// import type { NextApiRequest, NextApiResponse } from "next";

type PostRequestBody = {
  title: string;
  content: string;
};

export async function POST(request: Request) {
  const res = (await request.json()) as PostRequestBody;
  // console.log(res);
  const { title, content } = res;
  const result = await db.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: "Ryan",
        },
      },
    },
  });

  return NextResponse.json({ result });
}
