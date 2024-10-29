import React from "react"

interface IProps {
  classnames?: string
}

const DropDownArrowIcon: React.FC<IProps> = ({ classnames = "" }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={classnames}
      viewBox='0 0 24 24'
    >
      <path d='M6.984 9.984h10.031l-5.016 5.016z'></path>
    </svg>
  )
}

export default DropDownArrowIcon
