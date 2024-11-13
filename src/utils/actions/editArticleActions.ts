"use server"

import { AxiosError } from "axios"
import { cookies } from "next/headers"

import type { addArticleFormValues } from "@/types"

import { BaseApireq } from "../interceptors"

const EditArticleAction = async (
  formData: addArticleFormValues,
  slug: string,
) => {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")
    console.log(formData, slug)
    if (access_token && access_token.value) {
      const reqBody = {
        article: {
          title: formData?.title,
          description: formData?.description,
          body: formData?.body,
          tagList: formData?.selectedOptions,
        },
      }

      const res = await BaseApireq.put(`/articles/${slug}`, reqBody, {
        headers: {
          Authorization: `Token ${access_token.value}`,
        },
      })
      if (res.status === 200) {
        return { status: 200, message: "Article edited successfuly" }
      }
    }
    return {
      status: 409,
      message: "Your session has ended, please log in again.",
      data: null,
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessageKey = Object.keys(error?.response.data.errors)[0]
      const errorMessage = error?.response.data.errors[errorMessageKey][0]
      if (error.status === 422) {
        return { status: 422, message: `${errorMessageKey} ${errorMessage}` }
      }
      return {
        status: 400,
        message: "Something went wrong, please try again later!",
      }
    }
  }
}

export default EditArticleAction
