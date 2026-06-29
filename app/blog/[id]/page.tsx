"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "@/components/Modal";
import BlogForm from "@/components/BlogForm";

export default function BlogDetails() {
  const { id } = useParams();

  const router = useRouter();

  const [blog, setBlog] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const getBlog = async () => {
    const res = await axios.get(`/api/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  const deleteBlog = async () => {
    if (!confirm("Delete this blog?")) return;

    await axios.delete(`/api/blogs/${id}`);

    toast.success("Blog Deleted");

    router.push("/dashboard");
  };

  if (!blog)
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src={blog.image}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            {blog.title}
          </h1>

          <p className="text-gray-500 mt-4">
            {blog.description}
          </p>

          <p className="mt-8 leading-8">
            {blog.content}
          </p>

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => setOpen(true)}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={deleteBlog}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <BlogForm
          blog={blog}
          close={() => {
            setOpen(false);
            getBlog();
          }}
        />
      </Modal>

    </div>
  );
}