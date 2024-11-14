"use client"

import React from "react"

// eslint-disable-next-line import/no-cycle
import { cn } from "@/utils/helper"

interface IProps {
  toastId?: string | number
  icon?: JSX.Element | null
  containerClass?: string
  expended?: true
  button1?: JSX.Element | null
  button2?: JSX.Element | null
  description?: string | null
  header?: string | null
}

const CustomToast: React.FC<IProps> = ({
  icon,
  expended = false,
  containerClass = "",
  description,
  button1,
  button2,
  toastId,
  header,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        !!containerClass && containerClass
      )}
    >
      {!!icon && icon}
      <div className='w-full px-2'>
        {expended ? (
          <div>
            <h2 className={cn("text-label_md")}>{header}</h2>
            <p className={cn("mt-1 text-paragraph_sm")}>{description}</p>

            <div className={cn("inline-grid grid-cols-2 gap-x-5")}>
              {!!button1 && button1}
              {!!button2 && button2}
            </div>
          </div>
        ) : (
          <div className='flex w-full items-center'>
            <p className={cn("flex-1 text-paragraph_md")}>
              <b>{header}</b> {description}
            </p>

            <span
              className={cn(
                "flex size-fit -translate-y-0.5 items-center justify-between justify-self-end"
              )}
            >
              {!!button1 && button1}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomToast
