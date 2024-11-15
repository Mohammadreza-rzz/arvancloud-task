import React from "react"

interface IProps {
  classnames?: string
}

const ArticleIcon: React.FC<IProps> = ({ classnames = "" }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={classnames}
      viewBox='0 0 24 24'
    >
      <path d='M18.984 3h-13.969q-0.844 0-1.43 0.586t-0.586 1.43v13.969q0 0.844 0.586 1.43t1.43 0.586h13.969q0.844 0 1.43-0.586t0.586-1.43v-13.969q0-0.844-0.586-1.43t-1.43-0.586zM14.016 17.016h-7.031v-2.016h7.031v2.016zM17.016 12.984h-10.031v-1.969h10.031v1.969zM17.016 9h-10.031v-2.016h10.031v2.016z' />
    </svg>
  )
}

export default ArticleIcon
