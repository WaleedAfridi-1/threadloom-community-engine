"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import { CreateComment } from "../../app/actions/CreateComment";
import { FaCommentDots } from "react-icons/fa";


const AddComment = ({ postId, parentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  
  return (
    <div className="  -translate-x-3 lg:w-1/2">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size={"sm"}
        variant={"link"}
        className="text-gray-400 cursor-pointer"
      >
        Reply
      </Button>
      {isOpen && (
        <form action={CreateComment} className="py-3 ml-2 space-y-3">
          <input type="hidden" name="postId" id="postId" value={postId} />
          <input type="hidden" name="parentId" id="parentId" value={parentId} />
          <Textarea
            name="content"
            placeholder="Write a Comment."
            className="focus-visible:ring-0 px-5  py-3 shadow "
          />
          <Button
            type="submit"
            variant={"secondary"}
            onClick={!session?.user ? (e) => e.preventDefault() : undefined }
            className={`${!session?.user ? 'opacity-45 cursor-not-allowed':"block cursor-pointer"}  rounded px-3 py-2  hover:border-b-2  lg:border-gray-300 hover:bg-slate-100`}
          >
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddComment;
