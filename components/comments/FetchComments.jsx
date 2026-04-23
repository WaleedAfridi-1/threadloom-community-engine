import { prisma } from "@/lib/prisma";
import { cache} from 'react';
export const FetchComments =  cache((postId) => {

    return  prisma.comment.findMany({
        where:{
            postId: postId
        },
        include:{
            user:{
                select:{
                    name:true,
                    image:true
                }
            }
        },
        orderBy: {
            createdAt: 'desc' 
        }
    })
})