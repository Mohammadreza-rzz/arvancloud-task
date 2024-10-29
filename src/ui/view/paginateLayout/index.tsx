"use client"

import React from "react"

import { CustomePagination } from "@/ui/components"

interface IProps {}

const PaginateLayout: React.FC<IProps> = () => {
  return (
    <div className='mt-16 w-full'>
      <CustomePagination
        pageCount={10}
        onPageChange={() => console.log("hello")}
      />
    </div>
  )
}
export default PaginateLayout
