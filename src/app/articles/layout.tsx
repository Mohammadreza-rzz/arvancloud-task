"use client"
import {
  DeskTopSideBar,
  MobileSideBar,
  // PaginateLayout,
  TopBar,
} from "@/ui/view"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='w-full'>
        {/* <TopBar /> */}
        <div className='flex  h-[1024px] w-full [@media(max-height:1089px)]:h-[calc(100vh-66px)] [@media(max-width:767px)]:h-[calc(100vh)]'>
          {/* <DeskTopSideBar /> */}
          {/* <MobileSideBar /> */}
          <div className='relative flex-1 overflow-y-auto overflow-x-hidden px-2 pt-6 md:px-[30px]'>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
            {/* <PaginateLayout /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
