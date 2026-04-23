import { prisma } from "./prisma";

export const FetchPost = async (slug) => {
  const topic = await prisma.topic.findFirst({
    where: { slug },
    
  });

  
  if (!topic) return [];

  return prisma.post.findMany({
    where: {
      topicId: topic.id   
    },
    include: {
      topic: {
        select: { slug: true }
      },
      _count: {
        select: { comments: true }
      },
      user: {
        select: { name: true }
      }
    }
  });
};