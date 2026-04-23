import { prisma } from "./prisma"

export const FetchTopics = async () => {
    return await prisma.topic.findMany({
        include: {
            posts : {
                select : {
                    user :{
                        select : {
                            name : true
                        }
                    }
                }
            },
            _count: {
                select: { posts: true } 
            },
        },

        orderBy: {
            posts: {
                _count: "desc"
            }
        }
    })
}