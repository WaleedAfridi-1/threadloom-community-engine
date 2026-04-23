import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, Clock, Share2 } from "lucide-react";

const PostPreview = async ({ postId }) => {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } }
    }
  });
  if (!post) notFound();

  return (
    <article className="max-w-4xl lg:min-w-4xl px-2 lg:px-4  mx-auto bg-white overflow-hidden">
      {/* Header Section */}
      <header className="space-y-6">
        {/* Category & Badge */}
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
            {post.topic?.slug.replace(/-/g, " ") || "Discussion"}
          </span>
          <div className="flex items-center text-gray-500 text-sm gap-1">
            <Clock size={14} />
            <span>5 min read</span>
          </div>
        </div>

        {/* Title: Responsive font sizes */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
          {post.title}
        </h1>

        {/* Author & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold text-lg">
              {post.user?.name?.charAt(0) || "U"}
              
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{post.user?.name || "Anonymous"}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* Content Section */}
      <div className="mt-8">
        <div className="text-gray-800 leading-[1.8] text-lg md:text-xl">
          {/* Using a wrapper to prevent extreme stretching */}
          <div className="max-w-3xl">
            {/* First Paragraph Styling */}
            <p className="whitespace-pre-wrap break-words first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              {post.content}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-12 pt-6 border-t border-gray-50">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 text-xs font-medium">
          <BookOpen size={14} />
          <span>Post ID: {postId.substring(0, 8)}</span>
        </div>
      </footer>
    </article>
  );
};

export default PostPreview;