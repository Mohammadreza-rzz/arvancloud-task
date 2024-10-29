"use clinet"

import "@/assets/styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"

export const metadata: Metadata = {
  title: "ArvanCloud Dashboard",
  description: "ArvanCloud Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='mx-auto max-w-[1440px]'>
        {children}
        <ToastContainer
          hideProgressBar
          toastClassName='p-0 m-0 min-h-0'
          bodyClassName='m-0 p-0 rounded-md'
          limit={3}
        />
      </body>
    </html>
  )
}
