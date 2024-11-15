"use server"

import { AxiosError } from "axios"
import { cookies } from "next/headers"

import { loginSchema } from "@/utils/validations/FormSchema"

import { BaseApireq } from "../interceptors"

const loginAction = async (password: string, email: string) => {
  try {
    await loginSchema.validate({ email, password }, { abortEarly: false })
    const cookieStore = await cookies()
    const res = await BaseApireq.post("/users/login", {
      user: { email, password },
    })
    if (res.status === 200) {
      const userInfo = res.data?.user
      const access_token = userInfo?.token
      if (access_token) {
        cookieStore.set("access_token", access_token, {
          secure: true,
          httpOnly: true,
          path: "/",
          // maxAge: 60,
          maxAge: 60 * 60 * 24, // 1 day
        })
      }

      return { status: 200, message: "login successfully" }
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessageKey = Object.keys(error?.response.data.errors)[0]
      const errorMessage = error?.response.data.errors[errorMessageKey][0]
      if (error.status === 422) {
        return { status: 422, message: `${errorMessageKey} ${errorMessage}` }
      }
      if (error.status === 403) {
        return { status: 403, message: `${errorMessageKey} ${errorMessage}` }
      }
      return {
        status: 400,
        message: "Something went wrong, please try again later!",
      }
    }
  }
}

export default loginAction
