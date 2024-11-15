import React from "react"

interface IProps {
  classnames?: string
}

const OpenEyeIcon: React.FC<IProps> = ({ classnames = "" }) => {
  return (
    <svg className={classnames} id='icon-eye' viewBox='0 0 32 32'>
      <path d='M16 9v0c9 0 13 7 13 7s-4 7-13 7c-9 0-13-7-13-7s4-7 13-7zM16 20c2.209 0 4-1.791 4-4s-1.791-4-4-4c-2.209 0-4 1.791-4 4s1.791 4 4 4v0zM16 19v0c-1.657 0-3-1.343-3-3s1.343-3 3-3c1.657 0 3 1.343 3 3s-1.343 3-3 3zM16 17c0.552 0 1-0.448 1-1s-0.448-1-1-1c-0.552 0-1 0.448-1 1s0.448 1 1 1v0z' />
    </svg>
  )
}

export default OpenEyeIcon
