import db from "@/server/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  console.log("id to delete ====", id);
  const post = await db.post.delete({
    where: { id },
  });
  return NextResponse.json(post);
}
