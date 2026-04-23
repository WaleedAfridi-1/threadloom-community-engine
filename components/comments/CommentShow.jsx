import AddComment from "./AddComment";
import { FetchComments } from "./FetchComments";
import Image from "next/image";
import { cache } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


const CommentShow =  cache( async ({ postId, parentId, allComments }) => {

  const comments = await FetchComments(postId);
  
  const childComments = comments.filter((c) => c.parentId === parentId);

  if (childComments.length === 0) return null;

  return (
    <div className=" border-l-2 border-gray-200  px-2 lg:px-3 mt-2 space-y-4">
      {childComments.map((comment) => (

        <div key={comment.id} className="py-2 ">
          <div className="bg-gray-50 shadow p-3 rounded-lg">
            <div className="py-2 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={comment.user.image || ""} className="border-2 border-gray-200"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-700">{comment.user.name}</p>
              </div>
            <p className="text-sm text-gray-800">{comment.content}</p>
            <AddComment postId={postId} parentId={comment.id} />
          </div>

          <CommentShow 
            postId={postId} 
            parentId={comment.id} 
            allComments={comments} 
          />
        </div>
      ))}
    </div>
  );
})

export default CommentShow;