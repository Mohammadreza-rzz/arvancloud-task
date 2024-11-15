import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

import { toastHandler } from "@/utils/helper"

import { userRegisterApi } from "../apiFunction"

const useRegister = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: userRegisterApi,
    gcTime: 0,
    onError: error => {
      if (error instanceof AxiosError && error.response) {
        const errorMessageKey = Object.keys(error?.response.data.errors)[0]
        const errorMessage = error?.response.data.errors[errorMessageKey][0]
        console.log(error?.response?.data?.errors, "error")
        const message = `${errorMessageKey} ${errorMessage}`
        toastHandler(400, "Register Failed!", message, "user-exist")
      }
      return
    },
    onSuccess: () => {
      toastHandler(200, "Well Done!", "registered successfully", "user-exist")
      router.push("/login")
    },
  })
  return mutation
}

export default useRegister
