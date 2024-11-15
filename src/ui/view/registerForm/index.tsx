"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useForm } from "react-hook-form"
import { useRegister } from "@/utils/api/apiQuery"
import type { registerSchemaType } from "@/types"
import { Button, TextInput } from "@/ui/components"
import LoadingUi from "@/ui/components/loadingUi"
import { registerSchema } from "@/utils/validations/FormSchema"

interface IProps {}

type FormValues = {
  username: string
  email: string
  password: string
}

const RegisterForm: React.FC<IProps> = () => {
  const { mutateAsync, isPending } = useRegister()

  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { handleSubmit, control } = useForm<FormValues | any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const submitHandler = async (values: registerSchemaType) => {
    const { email, password, username } = values

    const reqBody = {
      user: {
        email,
        password,
        username,
      },
    }
    await mutateAsync(reqBody)
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='w-[320px] rounded-[4px] bg-gray-50 p-5 xs:w-[420px] sm:w-[450px]'
    >
      <h1 className='mt-4 text-center text-heading_lg text-light-300'>
        Register
      </h1>
      <div className='mt-7 space-y-6'>
        <TextInput
          hasErrorMessage
          containerStyle='w-full'
          label='User'
          inputProps={{
            control,
            name: "username",
            disabled: false,
          }}
        />
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
        disabled={isPending}
        classnames='w-full bg-primary-100 mt-7'
        type='submit'
        label='Register'
      />
      <div className='mt-4 flex items-center space-x-2.5'>
        <p className='text-paragraph_sm text-light-500'>Already Registered?</p>
        <Link href='/login' className='text-sub_heading_md text-light-500'>
          Login
        </Link>
      </div>
      {!!isPending && <LoadingUi />}
    </form>
  )
}

export default RegisterForm
