import React from "react";
import { Button } from "@/components/ui/button";
import PostPopup from "../../../components/PostPopup";
import PostList from "../../../components/posts/PostList";
import { FetchPost } from "../../../lib/FetchPost";
import Link from "next/link";
import { ChevronLeft, MessageSquareDashed } from "lucide-react";

const TopicSlugPage = async ({ params }) => {
  const slug = (await params).slug;
  const posts = await FetchPost(slug); // Standardized to lowercase 'posts'

  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/[0-9]/g, "")
    .trim();

  // --- Empty State (When no posts exist) ---
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="flex flex-col items-center max-w-md w-full text-center">
          <div className="p-6 bg-blue-50 rounded-2xl mb-6">
            <MessageSquareDashed className="w-12 h-12 text-blue-500 opacity-80" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 capitalize italic">
            "{formattedTitle}"
          </h2>
          <p className="text-gray-500 mt-2 mb-8">
            This topic is currently empty. Be the first one to share something interesting here!
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className='py-5'>Go Back</Button>
            </Link>
            <PostPopup slug={slug} />
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content ---
  return (
    <div className="max-w-7xl mx-auto lg:px-10 px-4 w-full pb-20">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end pt-8 pb-10 gap-6">
        <div className="space-y-4">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="pl-0 cursor-pointer hover:bg-transparent group text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Button>
          </Link>
          
          <h1 className="capitalize text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            {formattedTitle}
          </h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full" /> {/* Accent line */}
        </div>

        <div className="flex items-center">
          <PostPopup slug={slug} />
        </div>
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <PostList posts={posts}/>
        </div>
        
        {/* Optional Sidebar for info */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-10 border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
            <h4 className="font-bold text-gray-700 mb-2 italic">About this Topic</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              You are viewing posts related to <span className="font-semibold text-gray-700">"{formattedTitle}"</span>. 
              Join the discussion by posting your thoughts.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TopicSlugPage;