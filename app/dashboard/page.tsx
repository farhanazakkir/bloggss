"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/BlogCard";
import Modal from "@/components/Modal";
import BlogForm from "@/components/BlogForm";
import toast from "react-hot-toast";
//import Header from "@/components/Header";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);

  const getBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Blog Dashboard
          </h1>

          <button
            onClick={()=>{
              setEditBlog(null);
              setOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            + Create Blog
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog:any)=>(
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))}

        </div>

      </div>

      <Modal open={open} onClose={()=>setOpen(false)}>

        <BlogForm
          close={()=>{
            setOpen(false);
            getBlogs();
          }}
          blog={editBlog}
        />

      </Modal>

    </div>
  );
}