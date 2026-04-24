"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const CreatePost = async (slug, formData) => {

    const session = await auth();
    
    const title = formData.get('title');
    const content = formData.get('content');
    if (!title.trim() || !content.trim()) return null;
    
    const topic = await prisma.topic.findUnique({
        where: { slug }
    })
    if (!topic) {
        throw new Error("Topic not found.")
    }


    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            userId: session?.user.id,
            topicId: topic.id
        }
    })


 
    revalidatePath("/")
    redirect(`/topics/${slug}/post/${post.id}`)

}
