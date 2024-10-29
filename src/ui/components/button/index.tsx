"use client"
import React from "react"

interface IProps {
  type?: "submit" | "button" | "reset"
  classnames?: string
  label: string
  clickHandler?: () => void
}

const Button: React.FC<IProps> = ({
  label = "",
  classnames = "",
  type = "submit",
  clickHandler = () => {},
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`inline-flex items-center justify-center click_Effect rounded-[4px] pb-3 pt-2.5 text-center text-paragraph_md text-white ${classnames}`}
      // eslint-disable-next-line react/button-has-type
      type={type}
      value={label}
    >
      {label}
    </button>
  )
}

export default Button
