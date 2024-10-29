"use client"
import React from "react"
import { CustomePagination } from "@/ui/components"

interface IProps {}

const PaginateLayout: React.FC<IProps> = () => {
  return (
    <div className='w-full mt-16'>
      <CustomePagination
        pageCount={10}
        onPageChange={() => console.log("hello")}
      />
    </div>
  )
}
export default PaginateLayout
