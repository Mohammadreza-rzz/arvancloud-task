"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"

import type { registerSchemaType } from "@/types"
import { Button, TextInput } from "@/ui/components"
import LoadingUi from "@/ui/components/loadingUi"
import { registerAction } from "@/utils/actions"
import { toastHandler } from "@/utils/helper"
import { registerSchema } from "@/utils/validations/FormSchema"

interface IProps {}

type FormValues = {
  username: string
  email: string
  password: string
}

const RegisterForm: React.FC<IProps> = () => {
  const [isPending, startTransition] = useTransition()
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
    startTransition(async () => {
      const res = await registerAction(username, password, email)
      if (res?.status) {
        if (res?.status >= 200 && res?.status < 400) {
          toastHandler(200, "Well done", res?.message, "register-success")
          router.push("/login")
        } else {
          toastHandler(400, "Register Failed!", res?.message, "user-exist")
        }
      }
    })
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
