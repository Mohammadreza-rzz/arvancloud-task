"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"

import { toastHandler } from "@/utils/helper"

interface IProps {
  children?: React.ReactNode
}

const LogoutButtonContainer: React.FC<IProps> = ({ children }) => {
  const router = useRouter()
  const logOutHandler = async () => {
    const res = await axios.get("/api/auth/logout")
    if (res.status === 200) {
      toastHandler(200, "", res.data.message, "logout-success")
      router.push("/login")
    } else {
      toastHandler(400, "", res.data.message, "logout-failed")
    }
  }
  return (
    <div
      className='inline-block size-fit'
      onClick={logOutHandler}
      onKeyDown={logOutHandler}
      role='button'
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default LogoutButtonContainer
