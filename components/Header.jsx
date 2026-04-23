'use client'
import { Suspense } from "react";
import AuthHeader from "./AuthHeader";
import SearchForm from "./SearchForm";
const HeaderPage =  () => {
  return (
    <div className="w-full   flex flex-col lg:justify-between justify-around gap-6  lg:px-10 lg:gap-2 py-5">
      <div className="flex justify-between px-6">
        <h1 className="text-2xl tracking-wider font-black lg:text-3xl text-gray-800">ThreadLoom</h1>
        <AuthHeader/>
      </div>
      <Suspense>
        <SearchForm/>
      </Suspense>
    </div>
  );
};

export default HeaderPage;
