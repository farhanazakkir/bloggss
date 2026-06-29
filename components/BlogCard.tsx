"use client";

import Link from "next/link";

export default function BlogCard({ blog }: any) {

  return (

    <Link href={`/blog/${blog._id}`}>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 duration-300 cursor-pointer">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-5">

          <h2 className="text-2xl font-bold">
            {blog.title}
          </h2>

          <p className="text-gray-600 mt-3">
            {blog.description}
          </p>

        </div>

      </div>

    </Link>

  );
}