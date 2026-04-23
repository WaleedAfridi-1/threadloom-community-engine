import { prisma } from "../../lib/prisma"



export const SearchPosts = async (terms) => {
    return prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: terms } },
                { content: { contains: terms } }

            ]
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
    })
}