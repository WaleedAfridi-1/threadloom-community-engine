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
import { CreateTopic} from "../app/actions/CreateTopic";
import { ToasterErrorHandle } from "./ToasterFormHandling/CreatetoasterHandle"
import { useSession } from "next-auth/react";

const FormDialogDemo =   () => {
  const {data:session, status} = useSession()
  if(status === "loading") return null;
  if(!session?.user) return null;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={` px-2 tracking-wider  rounded-lg py-6 hover:-translate-y-1 hover:shadow-sidebar-border hover:bg-gray-700 border border-white shadow-2xl text-center
          font-bold  cursor-pointer active:scale-95 flex justify-center items-center`}
        >
          
          New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg ">
        <form action={CreateTopic} onSubmit={ToasterErrorHandle}>
          <DialogHeader>
            <DialogTitle className="font-bold">Create Topic</DialogTitle>
            <DialogDescription>
              Create a topic to begin the discussion. Click Save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label className="mt-3">Topic Name</Label>
              <input
                id="title"
                name="title"
                placeholder="Title..."
                className="rounded ring px-3 py-3"
              />
            </Field>
            <Field>
              <Label >Description</Label>
              <textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Description..."
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
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default FormDialogDemo;
