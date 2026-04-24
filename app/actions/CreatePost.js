"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const CreatePost = async (slug, formData) => {
    const session = await auth();
    
    // 1. Authentication Check
    if (!session || !session.user || !session.user.id) {
        throw new Error("You must be logged in to create a post.");
    }

    const title = formData.get('title');
    const content = formData.get('content');

    // 2. Validation
    if (typeof title !== 'string' || title.length < 3) return { error: "Title too short" };
    if (typeof content !== 'string' || content.length < 10) return { error: "Content too short" };

    // 3. Find Topic
    const topic = await prisma.topic.findUnique({
        where: { slug }
    });

    if (!topic) {
        throw new Error("Topic not found.");
    }

    let post; // Define outside to use in redirect
    try {
        post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                userId: session.user.id, // Now we are sure this exists
                topicId: topic.id
            }
        });
    } catch (err) {
        console.error("Database Error:", err);
        return { error: "Failed to create post in database." };
    }

    // 4. Success - Revalidate and Redirect
    revalidatePath(`/topics/${slug}`); 
    revalidatePath("/");
    
    // Redirect MUST be outside of try/catch if you use one
    redirect(`/topics/${slug}/post/${post.id}`);
}
