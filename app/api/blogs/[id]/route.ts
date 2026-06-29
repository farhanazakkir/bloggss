import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const blog = await Blog.findById(id);

  return NextResponse.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const body = await req.json();

  const blog = await Blog.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(blog);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await Blog.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Deleted Successfully",
  });
}