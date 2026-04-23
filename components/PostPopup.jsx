"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { CreatePost } from "../app/actions/CreatePost";
import { PostCreateHandle } from "./PostCreateHandle/PostCreateHandle";



const PostPopup =  ({slug}) => {

  const {data:session, status} = useSession()
  if(status === "loading") return null;
  if(!session?.user) return null;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={` tracking-wider  rounded-lg py-5  hover:bg-gray-700 border border-white shadow-2xl text-center
          font-bold  cursor-pointer active:scale-95 flex justify-center items-center`}
        >
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg ">
        <form  action={CreatePost.bind(null, slug)} onSubmit={PostCreateHandle}>
          <DialogHeader>
            <DialogTitle className="font-bold">Create Post</DialogTitle>
            <DialogDescription>
              Create a Post. Click Create when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label className="mt-3">Title</Label>
              <input
                id="title"
                name="title"
                placeholder="Title..."
                className="rounded ring px-3 py-3"
              />
            </Field>
            <Field>
              <Label >Content</Label>
              <textarea
                id="content"
                name="content"
                rows={6}
                placeholder="Content..."
                className="rounded ring py-3 px-4 "
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer lg:mt-3  rounded-lg hover:text-gray-600 px-4"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className=" cursor-pointer px-5 tracking-wider mt-3 rounded-lg"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default PostPopup;
