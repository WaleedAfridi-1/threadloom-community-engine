import FormDialogDemo from '@/components/FormDialogDemo';
import { GiHouse, GiAstronautHelmet } from "react-icons/gi";
import { FetchTopics } from "@/lib/FetchTopic";
import TopicList from "@/components/posts/TopicList";
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';

export default async function Home() {

  const topics = await FetchTopics();
  await prisma.topic.deleteMany()
  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center p-5">
        <div className="bg-slate-100 p-8 rounded-full mb-6 animate-bounce">
          <GiAstronautHelmet className="text-6xl text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">It's pretty quiet in here</h1>
        <p className="text-slate-500 mb-8 max-w-sm">
          No topics have been created yet. Be the first to start a conversation!
        </p>
        <FormDialogDemo />
      </div>
    );
  }
  return (
    
    <div className="px-5 lg:px-10 py-4 lg:py-10">
      
      <div className="flex justify-between items-center lg:-translate-y-10">
        <GiHouse className="text-4xl cursor-pointer hover:text-slate-500 active:scale-95"/>
        <FormDialogDemo/>
      </div>
      <div className='gird grid-cols-4 w-full'>
        <div className='lg:col-span-3 grid-cols-4'>
          <Suspense fallback={<p className='translate-x-1/3 translate-y-1/3 h-screen  w-screen'>Loading...</p>}>
            <TopicList topics={topics}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
