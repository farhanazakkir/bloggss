"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogForm({
  close,
  blog,
}: any) {

  const [title,setTitle]=useState(blog?.title || "");
  const [image,setImage]=useState(blog?.image || "");
  const [description,setDescription]=useState(blog?.description || "");
  const [content,setContent]=useState(blog?.content || "");

  const submit=async()=>{

    const body={
      title,
      image,
      description,
      content,
    };

    if(blog){

      await axios.put(`/api/blogs/${blog._id}`,body);

      toast.success("Blog Updated");

    }else{

      await axios.post("/api/blogs",body);

      toast.success("Blog Created");

    }

    close();

  };

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">

        {blog ? "Edit Blog":"Create Blog"}

      </h2>

      <input
        className="border w-full p-3 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        className="border w-full p-3 rounded mb-4"
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      <input
        className="border w-full p-3 rounded mb-4"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <textarea
        className="border w-full p-3 rounded mb-4 h-40"
        placeholder="Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white w-full py-3 rounded-lg"
      >
        {blog ? "Update":"Create"}
      </button>

    </div>

  );

}