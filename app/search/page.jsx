import React from 'react'
import PostList from "@/components/posts/PostList";
import { SearchPosts } from '../../components/PostCreateHandle/FetchPostBySearch';
import { SearchX } from 'lucide-react'; 
import Link from 'next/link'; // Import Link

const SearchPage = async ({ searchParams}) => {
    const { terms } = await searchParams;
    const posts = await SearchPosts(terms);
    
    const hasPosts = posts && posts.length > 0;

  return (
    <div className='lg:px-40 px-10 py-10'>
      <p className="text-blue-600 text-lg italic lg:ml-10 mb-6">
        Search results for: <span className="font-bold">"{terms}"</span>
      </p>

      {hasPosts ? (
        <PostList posts={posts}/>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <SearchX size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">No results found</h2>
          <p className="text-gray-500 mt-2 text-center max-w-xs">
            We couldn't find anything for **"{terms}"**.
          </p>
          
          <Link 
            href="/"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )
}

export default SearchPage