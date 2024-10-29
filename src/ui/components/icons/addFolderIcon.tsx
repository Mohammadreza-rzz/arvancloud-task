import React from "react"

interface IProps {
  classnames?: string
}

const AddFolderIcon: React.FC<IProps> = ({ classnames = "" }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={classnames}
      viewBox='0 0 32 32'
    >
      <path d='M18 8l-4-4h-14v26h32v-22h-14zM22 22h-4v4h-4v-4h-4v-4h4v-4h4v4h4v4z' />
    </svg>
  )
}

export default AddFolderIcon
