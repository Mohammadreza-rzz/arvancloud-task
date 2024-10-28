import * as Yup from "yup"

import type { loginSchemaType } from "@/types"

export const loginSchema = Yup.object<loginSchemaType>({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("password is required"),
})
