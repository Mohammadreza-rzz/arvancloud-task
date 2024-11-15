import React from "react"

interface IProps {
  classnames?: string
}

const LogOutIcon: React.FC<IProps> = ({ classnames = "" }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={classnames}
      viewBox='0 0 32 32'
    >
      <path d='M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z' />
    </svg>
  )
}

export default LogOutIcon
