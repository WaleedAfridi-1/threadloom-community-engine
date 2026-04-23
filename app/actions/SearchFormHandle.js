"use server"

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export  const SearchHandle = async (formData) => {
    const terms = formData.get('terms')
    
    if(!terms.trim()) return;

    redirect(`/search?terms=${terms}`)
}