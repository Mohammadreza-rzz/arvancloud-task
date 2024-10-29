import { DeskTopSideBar, MobileSideBar, TopBar } from "@/ui/view"

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='w-full'>
        <TopBar />
        <div className='flex h-[1024px] w-full [@media(max-width:1440px)]:h-[calc(100vh-66px)] [@media(max-width:768px)]:h-[calc(100vh)] '>
          <DeskTopSideBar />
          <MobileSideBar />
          {children}
        </div>
      </div>
    </div>
  )
}
