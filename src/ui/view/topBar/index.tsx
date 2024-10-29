import React from "react"
import { Button } from "@/ui/components"

interface IProps {}

const TopBar: React.FC<IProps> = () => {
  return (
    <div className='flex items-center justify-between w-full pl-[18px] pr-8 py-3 bg-light-500'>
      <span className='inline-flex space-x-5 items-center'>
        <h2 className='text-white text-paragraph_xl'>Arvan Challenge</h2>
        <p className='text-white text-paragraph_sm'>
          Welcome {"mohammadreza razza"}
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
