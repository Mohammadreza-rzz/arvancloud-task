import React from "react"

interface IProps {
  children?: React.ReactNode
}

const ModalsLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='fixed h-screen w-screen bg-black/50 left-0 top-0 flex items-center justify-center z-40'>
      {children}
    </div>
  )
}

export default ModalsLayout
