import React from "react"

interface IProps {
  classnamse?: string
}
const XIcon: React.FC<IProps> = ({ classnamse = "" }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={classnamse}
      viewBox='0 0 24 24'
    >
      <path d='M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z' />
    </svg>
  )
}

export default XIcon
