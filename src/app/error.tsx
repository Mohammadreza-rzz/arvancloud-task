"use client"

import Link from "next/link"

import { Button } from "@/ui/components"

export default function Error() {
  return (
    <div className='fixed left-0 flex h-screen w-screen flex-col items-center justify-center bg-[url("/images/404.jpg")] bg-cover bg-center bg-no-repeat'>
      <h1 className='text-9xl font-extrabold tracking-widest text-gray-100'>
        500
      </h1>
      <div className='rounded mt-3 px-2 text-heading_lg font-bold text-warning-100'>
        Internal Server Error
      </div>
      <div className='mt-8'>
        <Link
          className='group relative inline-block text-sm font-medium text-red-600  focus:outline-none focus:ring'
          href='/articles'
        >
          <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform  group-hover:translate-x-0 group-hover:translate-y-0' />

          <Button
            classnames='relative block px-8 py-3 border border-current bg-warning-100/90 hover:bg-warning-100'
            label='Go to Dahsboar'
            type='button'
          />
        </Link>
      </div>
    </div>
  )
}
