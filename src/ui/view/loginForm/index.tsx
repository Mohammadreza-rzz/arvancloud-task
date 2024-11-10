"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import type React from "react"
import { useForm } from "react-hook-form"

import type { loginSchemaType } from "@/types"
import { Button, TextInput } from "@/ui/components"
import { loginSchema } from "@/utils/validations/FormSchema"

interface IProps {}

type FormValues = {
  email: string
  password: string
}

const LoginForm: React.FC<IProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { handleSubmit, control } = useForm<FormValues | any>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submitHandler = (values: loginSchemaType) => {
    console.log(values)
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='w-[320px] rounded-[4px] bg-gray-50 p-5 xs:w-[420px] sm:w-[450px]'
    >
      <h1 className='mt-4 text-center text-heading_lg text-light-300'>LOGIN</h1>
      <div className='mt-7 space-y-6'>
        <TextInput
          hasErrorMessage
          containerStyle='w-full'
          label='Email'
          inputProps={{
            control,
            name: "email",
            disabled: false,
          }}
        />
        <TextInput
          hasErrorMessage
          containerStyle='w-full'
          label='Password'
          inputProps={{
            control,
            name: "password",
            disabled: false,
          }}
        />
      </div>
      <Button
        classnames='w-full bg-primary-100 mt-7'
        type='submit'
        label='Login'
      />
      <div className='mt-4 flex items-center space-x-2.5'>
        <p className='text-paragraph_sm text-light-500'>Don’t have account?</p>
        <Link href='/register' className='text-sub_heading_md text-light-500'>
          Register Now
        </Link>
      </div>
      <span
        className=' inline-flex'
        // onClick={() => {
        //   toast(
        //     <CustomToast
        //       toastId={"login-error"}
        //       containerClass=''
        //       header={"Login Failed!"}
        //       description={"User name and/or Password is invalid"}
        //     />,
        //     {
        //       style: {
        //         backgroundColor: "#e7cecd",
        //         color: "#9f4f48",
        //         minHeight: "50px",
        //         minWidth: "auto",
        //       },
        //       isLoading: false,
        //       toastId: "login-error",
        //     },
        //   )
        // }}
      >
        show toast 1
      </span>
    </form>
  )
}

export default LoginForm
