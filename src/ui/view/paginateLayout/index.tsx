"use client"
import React from "react"
import { CustomePagination } from "@/ui/components"

interface IProps {}

const PaginateLayout: React.FC<IProps> = () => {
  return (
    <div className='bg-blue-50 absolute bottom-[7%] w-full'>
      <CustomePagination
        pageCount={10}
        onPageChange={() => console.log("hello")}
      />
    </div>
  )
}
export default PaginateLayout
