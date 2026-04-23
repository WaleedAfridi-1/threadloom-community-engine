"use server";

import * as actions  from "@/auth";

export const SignOut = async () => {
  return actions.SignOut();
};