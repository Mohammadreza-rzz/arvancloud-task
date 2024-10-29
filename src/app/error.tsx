"use client"

import Link from "next/link"
import { Button } from "@/ui/components"
export default function Error() {
  return (
    <div className='fixed w-screen h-screen left-0 flex flex-col justify-center items-center bg-[url("/images/404.jpg")] bg-cover bg-no-repeat bg-center'>
      <h1 className='text-9xl font-extrabold text-gray-100 tracking-widest'>
        500
      </h1>
      <div className='px-2 text-heading_lg font-bold rounded mt-3 text-warning-100'>
        Internal Server Error
      </div>
      <div className='mt-8'>
        <Link
          className='relative inline-block text-sm font-medium text-red-600 group  focus:outline-none focus:ring'
          href='/articles'
        >
          <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5  group-hover:translate-y-0 group-hover:translate-x-0'></span>

          <Button
            classnames='relative block px-8 py-3 bg-white border border-current bg-warning-100/90 hover:bg-warning-100'
            label='Go to Dahsboar'
            type='button'
          />
        </Link>
      </div>
    </div>
  )
}
