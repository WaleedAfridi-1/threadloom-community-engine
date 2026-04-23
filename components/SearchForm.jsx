import React from 'react'
import { SearchHandle} from "@/app/actions/SearchFormHandle";
const SearchForm = () => {
  return (
    <div className=" flex w-full  gap-3 items-center px-5   justify-evenly">
        <form action={SearchHandle} className='w-full lg:w-1/2'>
          <input
            className="ring lg:  rounded-4xl py-3 px-5 w-full lg:-translate-y-10"
            type="text"
            placeholder="Search Post..."
            name="terms"
            />
        </form>

      </div>
  )
}

export default SearchForm
