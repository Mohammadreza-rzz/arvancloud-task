import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

import { toastHandler } from "@/utils/helper"

import { addArticleApi } from "../apiFunction"

const useAddArticle = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: addArticleApi,
    gcTime: 0,
    onError: error => {
      if (error instanceof AxiosError && error.response) {
        const errorMessageKey = Object.keys(error?.response.data.errors)[0]
        const errorMessage = error?.response.data.errors[errorMessageKey][0]
        const message = `${errorMessageKey} ${errorMessage}`
        toastHandler(400, "Add Article Failed!", message, "Add Article Failed!")
      }
      return
    },
    onSuccess: () => {
      toastHandler(
        200,
        "Well Done!",
        "Article added successfuly",
        "addArticle-success",
      )
      router.push("/articles")
    },
  })
  return mutation
}

export default useAddArticle
