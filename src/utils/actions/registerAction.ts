"use server"

import { registerSchema } from "@/utils/validations/FormSchema"

import { BaseApireq } from "../interceptors"
import axios from "axios"
import { headers } from "next/headers"

const registerAction = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    await registerSchema.validate(
      { email, password, username },
      { abortEarly: false },
    )

    const resBody = {
      user: {
        email: email,
        password: password,
        username: username,
      },
    }

    const res = await BaseApireq.post("/users", resBody)

    if (res.status === 201) {
      return { status: 201, message: "registered successfully" }
    }
  } catch (error: any) {
    const errorMessageKey = Object.keys(error?.response.data.errors)[0]
    const errorMessage = error?.response.data.errors[errorMessageKey][0]
    if (error.status === 422) {
      return { status: 422, message: `${errorMessageKey} ${errorMessage}` }
    } else {
      return {
        status: 400,
        message: '"Something went wrong, please try again later!',
      }
    }
  }
}

export default registerAction
