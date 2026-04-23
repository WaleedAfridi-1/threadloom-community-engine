"use server";

import * as action  from "@/auth"; 

export const SignIn = async () => {
  return action.signIn();
};