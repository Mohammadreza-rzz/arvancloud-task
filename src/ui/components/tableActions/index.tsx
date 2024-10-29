import React, { MouseEventHandler } from "react"
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
      className='flex items-center bg-info h-10 w-[65px] px-2 rounded-[4px] relative cursor-pointer'
    >
      <span className='inline-flex items-center justify-cente flex-1 text-white text-paragraph_lg'>
        ...
      </span>
      <DropDownArrowIcon classnames='size-4 flex-1 fill-white' />
      {!!isActive && (
        <ul className='absolute top-full bg-blue-400 w-[175px] right-0 z-20 border border-light-100 rounded-[4px] overflow-hidden'>
          {!!actionList?.length &&
            actionList?.map((item, i, arr) =>
              arr.length - 1 !== i ? (
                <li
                  key={Math.random()}
                  onClick={item.clickHandler}
                  className='text-light-400 text-paragraph_md pl-4 py-3 bg-white border-b border-light-100 cursor-pointer hover:bg-gray-200'
                >
                  {item?.title}
                </li>
              ) : (
                <li
                  key={Math.random()}
                  onClick={item.clickHandler}
                  className='text-light-400 text-paragraph_md pl-4 py-3 bg-white cursor-pointer hover:bg-gray-200'
                >
                  {item?.title}
                </li>
              ),
            )}
        </ul>
      )}
    </div>
  )
}
export default TableActions
