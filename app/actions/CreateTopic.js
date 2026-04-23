'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

async function generateUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let count = 1;

  while(true){
    const existing = await prisma.topic.findUnique({
      where:{
        slug
      }
    })
    if(!existing) break;
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;

}

export async function CreateTopic(formData) {
  'use server'
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";

 
  if(!title.trim() || !description.trim()){
    return;
  }
  const baseSlug = generateSlug(title);
  const slug = await generateUniqueSlug(baseSlug);

  try {
    await prisma.topic.create({
      data: {
        slug: slug,
        description: description,
      },
    });
    revalidatePath("/")
  } catch (error) {
    console.error("Prisma Error:", error);
    return;
  }
  redirect(`/topics/${slug}`)
}