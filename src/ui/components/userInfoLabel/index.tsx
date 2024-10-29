import React from "react"

interface IProps {
  username?: string
  classnames?: string
}

const UserLabel: React.FC<IProps> = ({
  username = "Arvan user",
  classnames,
}) => {
  const firstSlice =
    !!username && !!username.split(" ")[0] ? username.split(" ")[0] : ""
  const secondSlice =
    !!username && !!username.split(" ")[1] ? username.split(" ")[1] : ""
  return (
    <div
      className={`flex size-12 items-center justify-center rounded-full bg-red-400 text-paragraph_xl text-white ${classnames}`}
    >
      {(
        firstSlice[0].toLocaleUpperCase() + secondSlice[0].toLocaleUpperCase()
      ).trim()}
    </div>
  )
}

export default UserLabel
