import Link from "next/link"
import React from "react"

interface IProps {}

const DeskTopSideBar: React.FC<IProps> = () => {
  return (
    <aside className='hidden w-[250px] bg-primary-100 md:block'>
      <h3 className='px-5 py-3 text-paragraph_xl text-white'>Post</h3>
      <ul>
        <li className='w-full'>
          <Link
            className='inline-block w-full cursor-pointer pb-3 pl-9 pr-3 pt-2.5 text-paragraph_lg text-white hover:bg-blue-400/90'
            href='/'
          >
            All Articles
          </Link>
        </li>
        <li className='w-full'>
          <Link
            className='inline-block w-full cursor-pointer pb-3 pl-9 pr-3 pt-2.5 text-paragraph_lg text-white hover:bg-blue-400/90'
            href='/'
          >
            New Article
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default DeskTopSideBar
