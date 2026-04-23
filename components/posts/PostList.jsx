import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { MessageSquare, User, Calendar } from 'lucide-react';
import Link from 'next/link'

const PostList = async ({ posts}) => {
  if (!posts || posts.length === 0) return null;
  return (
    <div className='grid grid-cols-1 gap-6 py-10 lg:px-10'>
      {posts.map((item) => (
        <Link href={`/topics/${item.topic.slug}/post/${item.id}`} key={item.id} className="block group">
          <Card className='transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none shadow-md bg-white overflow-hidden'>
            <div className="h-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" /> {/* Top accent line */}
            
            <CardHeader className='flex flex-col gap-3 pb-2'>
              <CardTitle className='text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight'>
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className='flex items-center justify-between text-sm text-gray-500 font-medium'>
                {/* User Info Section */}
                <div className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full'>
                  <div className='bg-blue-100 p-1 rounded-full'>
                    <User size={14} className='text-blue-600' />
                  </div>
                  <span className='text-gray-700'>{item.user.name}</span>
                </div>

                {/* Stats Section */}
                <div className='flex items-center gap-4'>
                   <div className='flex items-center gap-1.5 text-gray-400 group-hover:text-blue-500 transition-colors'>
                    <MessageSquare size={18} />
                    <span className='font-semibold'>{item._count.comments}</span>
                    <span className='hidden sm:inline text-xs'>Comments</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default PostList