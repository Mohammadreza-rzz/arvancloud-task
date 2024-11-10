"use server"

import { registerSchema } from "@/utils/validations/FormSchema"

import { BaseApireq } from "../interceptors"

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

    const res = await BaseApireq.post("api/auth/register", {
      email,
      username,
      password,
    })
    if (res.status === 201) {
      return { status: 201, message: "registered successfully" }
    }
  } catch (error: any) {
    if (error.status === 409) {
      return { status: 409, message: "User already exists!" }
    } else if (error.status === 422) {
      return { status: 422, message: "All fields are required!" }
    } else {
      return {
        status: 400,
        message: '"Something went wrong, please try again later!',
      }
    }
  }
}

export default registerAction
