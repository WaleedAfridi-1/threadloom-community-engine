"use client"

import { toast } from "sonner";



export function ToasterErrorHandle(e) {

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    if (!title.trim() || !description.trim()) {
        e.preventDefault();
        toast.error("Validation failed!", {
            description: "Topic Name and Description cannot be empty."

        }
        )
    } else {
        setTimeout(() => {
            toast.success("Topic created!", {
                description: "Your topic has been published successfully.",
            });
        }, 1000);


    }
}


