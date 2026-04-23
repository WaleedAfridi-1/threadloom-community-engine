'use client'

import { Button } from "./ui/button";
import { SignIn } from "../app/actions/sign-In";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";



const AuthHeader =  () => {
  const {data:session, status }= useSession();
  
  if (status === "loading") {
  return <div className="w-8 h-8 animate-spin rounded-full border"></div>;
}
  
  let authContent;
  if (session?.user) {
    authContent = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 h-30 flex flex-col justify-between pb-2">
          <DropdownMenuGroup>
            <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
            <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup >
            <form  >
              <DropdownMenuItem asChild className="">
                <Button
                  onClick={() => signOut()}
                  variant={"destructive"}
                  type="submit"
                  className="cursor-pointer w-full hover:bg-red-300 ring-1i ring-red-400 "
                >
                  Log Out
                </Button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } 
  else {
    authContent = (
      <form action={SignIn}>
        <Button
          
          type="submit"
          variant={"outline"}
          className="rounded shadow ring ring-gray-800 hover:ring-gray-400 text-white  bg-gray-700 cursor-pointer active:scale-95 font-semibold hover:text-gray-700 hover:bg-gray-100"
        >
          Sign In
        </Button>
      </form>
    );
  }
  return authContent;
};

export default AuthHeader;
