import React from "react"

import { DropDownArrowIcon } from "@/ui/components/icons"

interface IProps {
  isActive?: boolean
  actionList?: { title: string; clickHandler: () => void }[]
  clickhandler?: () => void
}

const TableActions: React.FC<IProps> = ({
  isActive = false,
  actionList,
  clickhandler = () => {},
}) => {
  return (
    <div
      onClick={clickhandler}
      onKeyDown={clickhandler}
      tabIndex={0}
      role='button'
      className='relative flex h-10 w-[65px] cursor-pointer items-center rounded-[4px] bg-info px-2'
    >
      <span className='justify-cente inline-flex flex-1 items-center text-paragraph_lg text-white'>
        ...
      </span>
      <DropDownArrowIcon classnames='size-4 flex-1 fill-white' />
      {!!isActive && (
        <ul className='absolute right-0 top-full z-20 w-[175px] overflow-hidden rounded-[4px] border border-light-100 bg-blue-400'>
          {!!actionList?.length &&
            actionList?.map((item, i, arr) =>
              arr.length - 1 !== i ? (
                <li
                  key={Math.random()}
                  onClick={item.clickHandler}
                  tabIndex={0}
                  onKeyDown={item.clickHandler}
                  role='tab'
                  className='cursor-pointer border-b border-light-100 bg-white py-3 pl-4 text-paragraph_md text-light-400 hover:bg-gray-200'
                >
                  {item?.title}
                </li>
              ) : (
                <li
                  key={Math.random()}
                  tabIndex={0}
                  role='tab'
                  onKeyDown={item.clickHandler}
                  onClick={item.clickHandler}
                  className='cursor-pointer bg-white py-3 pl-4 text-paragraph_md text-light-400 hover:bg-gray-200'
                >
                  {item?.title}
                </li>
              )
            )}
        </ul>
      )}
    </div>
  )
}
export default TableActions
