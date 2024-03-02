import db from "@/server/db";
import { NextResponse } from "next/server";
// import type { NextApiRequest, NextApiResponse } from "next";

type PostRequestBody = {
  title: string;
  content: string;
  authorId: string;
};

export async function GET(request: Request) {
  const res = await request.json();
  console.log("GET:::", res);
  // const { title, content } = res;
  const result = await db.post.findMany();

  return NextResponse.json({ result });
}

export async function POST(request: Request) {
  const res = (await request.json()) as PostRequestBody;

  console.log("POST::::", res);
  const { title, content, authorId } = res;
  const authorName = await db.user.findUnique({
    where: {
      id: authorId,
    },
    select: {
      name: true,
    },
  });
  console.log("AuthorName [posts/route.ts]", authorName);
  const result = await db.post.create({
    data: {
      title,
      content,
      published: true,
      authorId,
    },
  });

  return NextResponse.json({ result });
}
