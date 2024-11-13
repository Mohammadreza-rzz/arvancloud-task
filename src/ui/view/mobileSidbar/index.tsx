"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useLayoutEffect, useState } from "react"

import type { UserData } from "@/types"
import { Button, LogoutButtonContainer, UserInfoLabel } from "@/ui/components"
import {
  ArticleIcon,
  FolderPlusIcon,
  LogOutIcon,
  MenuBarIcon,
  XIcon,
} from "@/ui/components/icons"
import { getUserData } from "@/utils/api/ClinetSideRequest"

interface IProps {}

const MobileSidbar: React.FC<IProps> = () => {
  // states & Logic
  const [sidebarActive, setSidebarActive] = useState<boolean>(false)
  const [userdata, setUserData] = useState<UserData | null>(null)
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState(
    pathname.includes("/articles/edit")
      ? null
      : pathname.includes("/articles/create")
        ? "New Article"
        : "All Articles"
  )

  // handlers
  const closeModalHandler = () => {
    setSidebarActive(false)
  }
  const openModalHandler = () => {
    setSidebarActive(true)
  }
  //   useEffects

  useLayoutEffect(() => {
    setActiveTab(
      pathname.includes("/articles/edit")
        ? null
        : pathname.includes("/articles/create")
          ? "New Article"
          : "All Articles"
    )
  }, [pathname])

  useLayoutEffect(() => {
    const getData = async () => {
      const res = await getUserData()
      setUserData(res.data)
    }
    getData()
  }, [])

  return (
    <aside className='relative z-30 flex w-[70px] flex-col items-center bg-primary-100 px-1 md:hidden'>
      <UserInfoLabel classnames='mt-4' username={userdata?.username ?? ""} />
      <div className='mt-10 flex w-full flex-col items-center justify-center space-y-5 '>
        <Link
          className={`click_Effect rounded-sm p-3 hover:bg-black/40 ${activeTab === "All Articles" && "bg-black/40"}`}
          href='/articles'
        >
          <ArticleIcon classnames='fill-white size-7' />
        </Link>
        <Link
          className={`click_Effect rounded-sm p-3 hover:bg-black/40 ${activeTab === "New Article" && "bg-black/40"}`}
          href='/articles/create'
        >
          <FolderPlusIcon classnames='fill-white size-7' />
        </Link>
      </div>
      <div className='mb-6 mt-auto flex flex-col space-y-2'>
        <span
          onClick={openModalHandler}
          className='click_Effect inline-block rounded-sm p-3 hover:bg-black/40'
        >
          <MenuBarIcon classnames='fill-white size-6' />
        </span>
        <span className='click_Effect inline-block rounded-sm p-3 hover:bg-black/40'>
          <LogoutButtonContainer>
            <LogOutIcon classnames='fill-white size-6 translate-x-1' />
          </LogoutButtonContainer>
        </span>
      </div>
      {/* sidebar menu modal in mobile  */}
      <div
        className={`fixed left-0 h-screen  bg-black/50 ${sidebarActive ? "w-full" : "w-0"}`}
      >
        <div
          className={`relative flex h-screen flex-col overflow-hidden bg-primary-100 transition-[width] duration-500 ease-in-out  ${sidebarActive ? "w-[250px]" : "w-0"}`}
        >
          <div className='w-full bg-light-500 py-6 pl-[18px] pr-8 '>
            <span className='inline-flex flex-col space-y-2'>
              <span
                className='absolute right-5 top-5 inline-block size-fit cursor-pointer'
                onClick={closeModalHandler}
              >
                <XIcon classnamse='size-5 fill-white' />
              </span>

              <h2 className='mb-3 text-paragraph_xl text-white'>
                Arvan Challenge
              </h2>
              <span className='inline-flex items-center justify-center space-x-2 '>
                <UserInfoLabel
                  classnames='mt-4'
                  username={userdata?.username ?? ""}
                />
                <p className='text-paragraph_sm text-white'>
                  mohammadreza razza
                </p>
              </span>
            </span>
          </div>
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
          <div className='mx-auto mt-auto'>
            <LogoutButtonContainer>
              <Button
                label='Logout'
                classnames='border mt-auto mb-5 mx-auto w-[210px] border-info !py-2 w-full text-info hover:bg-info hover:text-white transition-colors duration-500'
              />
            </LogoutButtonContainer>
          </div>
        </div>
      </div>
      {/* sidebar menu modal in mobile  */}
    </aside>
  )
}

export default MobileSidbar
