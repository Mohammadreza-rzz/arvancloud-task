"use client"

import type { InputHTMLAttributes } from "react"
import { CloseEyeIcon, OpenEyeIcon } from "@/ui/components/icons"
import React, { useState } from "react"
import type { FieldError, UseControllerProps } from "react-hook-form"
import { useController } from "react-hook-form"
import type { textInputProps } from "@/types"
import { cn } from "@/utils/helper"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  PasswordInput?: boolean
  containerStyle?: string
  InputContainerStyle?: string
  label?: string
  labelStyle?: string
  InputStyle?: string
  inputProps: UseControllerProps<textInputProps | any>
  hasErrorMessage?: boolean
}

const CustomInput: React.FC<IProps> = ({
  inputProps,
  label,
  type = "text",
  containerStyle,
  InputContainerStyle,
  labelStyle,
  id,
  InputStyle,
  placeholder,
  hasErrorMessage = false,
  disabled,
  PasswordInput = false,
  ...rest
}) => {
  const { field, formState } = useController(inputProps)
  const { name, onChange } = field
  const { errors } = formState
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState(true)

  const touchHandler = () => setIsFocus(true)
  const BlurHandler = () => setIsFocus(false)

  const error = errors[name] as FieldError | undefined

  return (
    <div className={cn("flex flex-col", containerStyle)}>
      <label
        className={`mb-[9px] text-paragraph_sm text-light-500 ${!!disabled && "text-light-200"} ${!!hasErrorMessage && error?.message && !disabled && "!text-danger-100"} ${labelStyle}`}
        htmlFor={id || name}
      >
        {label}
      </label>
      <div className={`relative flex w-full flex-col ${InputContainerStyle}'`}>
        {!!PasswordInput && (
          <div className='absolute right-2 top-2/4 -translate-y-2/4  z-10'>
            {!!isHidden ? (
              <span
                onClick={() => setIsHidden(preData => !preData)}
                className='w-fit h-fit'
              >
                <CloseEyeIcon classnames='w-7 h-7' />
              </span>
            ) : (
              <span
                onClick={() => setIsHidden(preData => !preData)}
                className='w-fit h-fit'
              >
                <OpenEyeIcon classnames='w-7 h-7' />
              </span>
            )}
          </div>
        )}
        <input
          {...field}
          {...rest}
          onFocus={touchHandler}
          onBlur={BlurHandler}
          onChange={onChange}
          type={!PasswordInput ? type : isHidden ? "password" : "text"}
          id={id || name}
          placeholder={placeholder}
          disabled={disabled}
          className={`${InputStyle} relative w-full rounded-[4px] border border-light-100 bg-white p-3 text-paragraph_lg text-light-400 outline-none placeholder:text-light-200 focus-visible:border-warning-100 ${!!hasErrorMessage && error?.message && !disabled && "border-danger-100 focus-visible:border-danger-100"} ${PasswordInput && "pr-12"}`}
        />
        {!!hasErrorMessage && error?.message && !disabled && (
          <span className='mt-2.5 inline-flex w-full justify-start'>
            <p className='text-paragraph_sm text-danger-100'>{error.message}</p>
          </span>
        )}
      </div>
    </div>
  )
}

export default CustomInput
