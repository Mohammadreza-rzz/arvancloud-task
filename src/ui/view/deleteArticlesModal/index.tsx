"use client"

import React from "react"

import { Button } from "@/ui/components"
import { XIcon } from "@/ui/components/icons"

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
    <div className=' flex min-w-[80%] flex-col rounded-[4px] bg-white sm:min-w-[500px]'>
      <div className='flex items-center justify-between border-b border-light-100 px-4 py-5'>
        {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
        <h2 className='text-[20px] text-paragraph_xl font-semibold text-light-500'>
          Delete Article
        </h2>
        <span
          role='button'
          tabIndex={0}
          onKeyDown={closeButtonHandler}
          onClick={closeButtonHandler}
          className='inline-block size-fit'
        >
          <XIcon classnamse='size-5 cursor-pointer click_Effect' />
        </span>
      </div>
      <div className='px-5 pb-12 pt-5'>
        <h3 className='text-sub_heading_lg text-light-400'>
          Are you sure to delete Article?
        </h3>
      </div>
      <div className='flex justify-end space-x-4 p-4'>
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
