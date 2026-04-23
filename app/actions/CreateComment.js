"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CreateComment = async (formData) => {
    const session = await auth();
    
    const content = formData.get("content");
    const postId = formData.get("postId");
    const parentId = formData.get("parentId") || null;
        
    if(!content.trim()) return null;
    
    await prisma.comment.create({
        data:{
            content:content,
            postId:postId,
            userId:session?.user.id,
            parentId:parentId 
        }
    })

    revalidatePath("/")
    // redirect(``)
    
}