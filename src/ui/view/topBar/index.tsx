import React from "react"

import { Button } from "@/ui/components"

interface IProps {}

const TopBar: React.FC<IProps> = () => {
  return (
    <div className='hidden w-full items-center justify-between bg-light-500 py-3 pl-[18px] pr-8 md:flex'>
      <span className='inline-flex items-center space-x-5'>
        <h2 className='text-paragraph_xl text-white'>Arvan Challenge</h2>
        <p className='text-paragraph_sm text-white'>
          Welcome mohammadreza razza
        </p>
      </span>
      <Button
        label='Logout'
        classnames='border border-info !py-2 !px-[19px] text-info hover:bg-info hover:text-white transition-colors duration-500'
      />
    </div>
  )
}

export default TopBar
