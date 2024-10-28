"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import type React from "react"
import { useForm } from "react-hook-form"

import type { loginSchemaType } from "@/types"
import { TextInput } from "@/ui/components"
import { loginSchema } from "@/utils/validations/loginFormSchema"

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
    <form onSubmit={handleSubmit(submitHandler)} className='bg-gray-50 p-5'>
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
      <button type='submit'>clickMe</button>
    </form>
  )
}

export default LoginForm
