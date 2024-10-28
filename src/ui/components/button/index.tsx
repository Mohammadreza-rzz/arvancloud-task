import React from "react"

interface IProps {
  type?: "submit" | "button"
  classnames?: string
  label: string
}

const Button: React.FC<IProps> = ({
  label = "",
  classnames = "",
  type = "button",
}) => {
  return (
    <button
      className={`click_Effect text-white text-paragraph_md pt-2.5 pb-3 rounded-[4px] text-center ${classnames}`}
      type={type}
      value={label}
    >
      {label}
    </button>
  )
}

export default Button
