import React from "react"

interface IProps {
  children?: React.ReactNode
}

const ModalsLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/50'>
      {children}
    </div>
  )
}

export default ModalsLayout
