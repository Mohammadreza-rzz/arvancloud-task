import * as Yup from "yup"

import type {
  articleDetailsFormSchemaType,
  loginSchemaType,
  registerSchemaType,
} from "@/types"

export const loginSchema = Yup.object<loginSchemaType>({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("password is required"),
})

export const registerSchema = Yup.object<registerSchemaType>({
  username: Yup.string().required("Email is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
})

export const articleDetailsFormSchema =
  Yup.object<articleDetailsFormSchemaType>({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
  })
