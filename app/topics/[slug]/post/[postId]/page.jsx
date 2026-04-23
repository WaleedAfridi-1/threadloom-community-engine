import React, { Suspense } from "react";
import PostPreview from "../../../../../components/posts/PostPreview";
import AddComment from "../../../../../components/comments/AddComment";
import Link from "next/link";
import { ChevronLeft, MessageCircle } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import CommentShow from "../../../../../components/comments/CommentShow";
import { FetchComments } from "../../../../../components/comments/FetchComments";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PostIdPage = async ({ params }) => {
  const { postId, slug } = await params;
  const comments = await FetchComments(postId);
  const parentComments = comments.filter((c) => c.parentId == null);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-20 py-8 space-y-8">
      {/* Back Button Section */}
      <div className="flex items-center">
        <Link href={`/topics/${slug}`}>
          <Button variant="ghost" className="pl-0 hover:bg-transparent group text-gray-500 hover:text-blue-600 transition-colors">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="capitalize font-medium">Back to {slug.replace("-", " ")}</span>
          </Button>
        </Link>
      </div>

      {/* Main Post Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Suspense fallback={<p className=" h-screen px-10 border-0  ">Loading...</p>}>
          <PostPreview postId={postId} />
        </Suspense>
      </section>

      <hr className="border-gray-100" />

      {/* Comments Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <MessageCircle size={20} className="text-blue-600" />
          <h3 className="font-bold text-xl text-gray-800">
            Discussion ({comments.length})
          </h3>
        </div>

        {/* Root Comment Box */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-3 ml-1">Share your thoughts</p>
          <AddComment postId={postId} />
        </div>

        {/* Comments List */}
        <div className="space-y-8 mt-10">
          {parentComments.map((comment) => (
            <div key={comment.id} className="group">
              {/* Individual Parent Comment */}
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border shadow-sm">
                  <AvatarImage src={comment.user.image || ""} />
                  <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                    {comment.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm group-hover:border-gray-200 transition-colors">
                    <p className="text-sm font-bold text-gray-900 mb-1">{comment.user.name}</p>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                  
                  {/* Reply Action */}
                  <div className="ml-2">
                    <AddComment postId={postId} parentId={comment.id} />
                  </div>

                  {/* Nested Replies with Thread Line */}
                  {/* Yahan 'ml-5' ke sath left border add kiya hai thread line dikhane ke liye */}
                  <div className="ml-4 pl-6 border-l-2 border-gray-100 mt-4 space-y-4">
                    <CommentShow
                      postId={postId}
                      parentId={comment.id}
                      allComments={comments}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostIdPage;