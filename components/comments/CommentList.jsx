import React from 'react'
import { prisma } from "@/lib/prisma";
import { FetchComments } from './FetchComments';


const CommentList = async ({postId}) => {
    const comments = await FetchComments(postId)
  return (
    <div>
      
    </div>
  )
}

export default CommentList
