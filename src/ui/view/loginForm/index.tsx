"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import type { loginSchemaType } from "@/types"
import { Button, CustomToast, TextInput } from "@/ui/components"
import LoadingUi from "@/ui/components/loadingUi"
import { loginAction } from "@/utils/actions"
import { loginSchema } from "@/utils/validations/FormSchema"

interface IProps {}

type FormValues = {
  email: string
  password: string
}

const handleToast = (statusCode: number, message: string) => {
  if (statusCode === 403 || statusCode === 422 || statusCode === 400) {
    return toast(
      <CustomToast
        toastId='Login'
        containerClass=''
        header='Login Failed!'
        description={`${message}`}
      />,
      {
        style: {
          backgroundColor: "#e7cecd",
          color: "#9f4f48",
          minHeight: "50px",
          minWidth: "auto",
        },
        isLoading: false,
        toastId: "Login",
      }
    )
  }
  if (statusCode === 200) {
    return toast(
      <CustomToast
        toastId='Login-success'
        containerClass=''
        header='Well done'
        description={`${message}`}
      />,
      {
        style: {
          backgroundColor: "#E2EED8",
          color: "#517643",
          minHeight: "50px",
          minWidth: "auto",
        },
        isLoading: false,
        toastId: "Login-success",
      }
    )
  }
}

const LoginForm: React.FC<IProps> = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { handleSubmit, control } = useForm<FormValues | any>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submitHandler = async (values: loginSchemaType) => {
    const { email, password } = values
    startTransition(async () => {
      const res = await loginAction(password, email)
      handleToast(
        res?.status ? res?.status : 400,
        res?.message ? res?.message : " "
      )
      if (res?.status === 200) {
        router.push("/articles")
      }
    })
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

      {!!isPending && <LoadingUi />}
    </form>
  )
}

export default LoginForm
