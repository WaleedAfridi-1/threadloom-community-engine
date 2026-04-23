import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Hash, MessageSquare, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const TopicList = ({ topics }) => {
  if (!topics || topics.length === 0) return null;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-10 lg:px-10'>
      {topics.map((item) => (
        <Link href={`/topics/${item.slug}`} key={item.id} className="group">
          <Card className='h-full relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group-hover:-translate-y-2'>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Hash size={80} strokeWidth={3} />
            </div>

            <CardHeader className='pb-2'>
              <div className='flex items-center gap-2 text-blue-600 mb-2'>
                <div className='p-2 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                  <Hash size={18} />
                </div>
                <span className='text-xs font-bold uppercase tracking-widest'>Explore Topic</span>
              </div>
              
              <CardTitle className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight capitalize'>
                {item.slug.replace(/-/g, " ")}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className='text-sm text-gray-500 mb-6 line-clamp-2'>
                Dive into discussions about {item.slug.replace(/-/g, " ")} and connect with the community.
              </p>

              <div className='flex items-center justify-between pt-4 border-t border-gray-50'>
                <div className='flex items-center gap-2'>
                  <div className='h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center'>
                    <User size={14} className='text-gray-500' />
                  </div>
                  <span className='text-xs font-medium text-gray-600'>{item?.posts[0]?.user?.name || "Anonymous"}</span>
                </div>

                <div className='flex items-center gap-1.5 text-gray-400'>
                  <MessageSquare size={14} />
                  <span className='text-xs font-bold'>{item._count?.posts || 0} Posts</span>
                </div>
              </div>

              {/* Bottom Action Hint */}
              <div className='mt-4 flex items-center gap-1 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0'>
                View Details <ArrowRight size={14} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default TopicList