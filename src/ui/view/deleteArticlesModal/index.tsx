"use client"
import React from "react"
import { XIcon } from "@/ui/components/icons"
import { Button } from "@/ui/components"
interface IProps {
  yesButtonHandler: () => void
  NoButtonHandler: () => void
  closeButtonHandler: () => void
}

const DeleteArticleModal: React.FC<IProps> = ({
  yesButtonHandler = () => {},
  NoButtonHandler = () => {},
  closeButtonHandler = () => {},
}) => {
  return (
    <div className=' min-w-[80%] sm:min-w-[500px] bg-white rounded-[4px] flex flex-col'>
      <div className='px-4 py-5 flex justify-between items-center border-b border-light-100'>
        <h2 className='text-paragraph_xl text-[20px] text-light-500 font-semibold'>
          Delete Article
        </h2>
        <span onClick={closeButtonHandler} className='size-fit inline-block'>
          <XIcon classnamse='size-5 cursor-pointer click_Effect' />
        </span>
      </div>
      <div className='pt-5 pb-12 px-5'>
        <h3 className='text-light-400 text-sub_heading_lg'>
          Are you sure to delete Article?
        </h3>
      </div>
      <div className='p-4 flex justify-end space-x-4'>
        <Button
          clickHandler={NoButtonHandler}
          type='button'
          label='No'
          classnames='bg-white border border-light-100 !text-light-400 hover:!text-white hover:bg-light-500 text-paragraph_md w-[75px] rounded-[4px]'
        />
        <Button
          clickHandler={yesButtonHandler}
          type='button'
          label='Yes'
          classnames='bg-danger-100 text-white w-[75px] rounded-[4px] hover:bg-danger-100/90 text-paragraph_md  '
        />
      </div>
    </div>
  )
}

export default DeleteArticleModal
