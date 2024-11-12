"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "react-toastify"

import { CustomToast } from "@/ui/components"

interface IProps {
  children?: React.ReactNode
}

const LogoutButtonContainer: React.FC<IProps> = ({ children }) => {
  const router = useRouter()
  const logOutHandler = async () => {
    const res = await axios.get("/api/auth/logout")
    if (res.status === 200) {
      toast(
        <CustomToast
          toastId='logout-success'
          containerClass=''
          header=''
          description={`${res.data.message}`}
        />,
        {
          style: {
            backgroundColor: "#E2EED8",
            color: "#517643",
            minHeight: "50px",
            minWidth: "auto",
          },
          isLoading: false,
          toastId: "logout-success",
        },
      )
      router.push("/login")
    } else {
      toast(
        <CustomToast
          toastId='logout-failed'
          containerClass=''
          header=''
          description={`${res.data.message}`}
        />,
        {
          style: {
            backgroundColor: "#e7cecd",
            color: "#9f4f48",
            minHeight: "50px",
            minWidth: "auto",
          },
          isLoading: false,
          toastId: "logout-failed",
        },
      )
    }
  }
  return (
    <div className='inline-block size-fit' onClick={logOutHandler}>
      {children}
    </div>
  )
}

export default LogoutButtonContainer
