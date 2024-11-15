import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { toastHandler } from "@/utils/helper"

import { deleteArticleApi } from "../apiFunction"

const useDeleteArticle = () => {
  const mutation = useMutation({
    mutationFn: deleteArticleApi,
    gcTime: 0,
    onError: error => {
      if (error instanceof AxiosError && error.response) {
        const errorMessageKey = Object.keys(error?.response.data.errors)[0]
        const errorMessage = error?.response.data.errors[errorMessageKey][0]
        const message = `${errorMessageKey} ${errorMessage}`
        toastHandler(
          400,
          "delete Article Failed!",
          message,
          "delete Article Failed!",
        )
      }
      return
    },
    onSuccess: () => {
      toastHandler(
        200,
        "Well Done!",
        "Article Deleted successfuly",
        "deleteArticle-success",
      )
    },
  })
  return mutation
}

export default useDeleteArticle
