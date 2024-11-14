"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

interface IProps {}

const activeTabHandler = (pathname: string) => {
  let initialActiveTabValue
  if (pathname.includes("/articles/edit")) {
    initialActiveTabValue = " "
  } else if (pathname.includes("/articles/create")) {
    initialActiveTabValue = "New Article"
  } else if (pathname.includes("/articles")) {
    initialActiveTabValue = "All Articles"
  } else {
    initialActiveTabValue = " "
  }
  return initialActiveTabValue
}

const DeskTopSideBar: React.FC<IProps> = () => {
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState(activeTabHandler(pathname))

  useEffect(() => {
    setActiveTab(activeTabHandler(pathname))
  }, [pathname])

  return (
    <aside className='hidden w-[250px] bg-primary-100 md:block'>
      <h3 className='px-5 py-3 text-paragraph_xl text-white'>Post</h3>
      <ul>
        <li className='w-full'>
          <Link
            className={`inline-block w-full cursor-pointer pb-3 pl-9 pr-3 pt-2.5 text-paragraph_lg text-white hover:bg-blue-400/90 ${activeTab === "All Articles" && "bg-blue-400/90"}`}
            href='/articles'
          >
            All Articles
          </Link>
        </li>
        <li className='w-full'>
          <Link
            className={`inline-block w-full cursor-pointer pb-3 pl-9 pr-3 pt-2.5 text-paragraph_lg text-white hover:bg-blue-400/90 ${activeTab === "New Article" && "bg-blue-400/90"}`}
            href='/articles/create'
          >
            New Article
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default DeskTopSideBar
