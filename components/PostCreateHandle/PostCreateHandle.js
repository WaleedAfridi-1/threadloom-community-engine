'use client'

import { toast } from "sonner";

export const PostCreateHandle = (e) => {
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;

    if(!title.trim() || !content.trim()){
        e.preventDefault();
        toast.error("Validation failed!",
            {description:"Title and Content cannot be empty."}
        )
    }else{
        setTimeout( () => {
            toast.success("Post Created!",
                {description:"Your Post has been published successfully."}
            )
        }, 1000)
    }
} 