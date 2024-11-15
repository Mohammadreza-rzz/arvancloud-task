import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

import { toastHandler } from "@/utils/helper"

import { userLogin } from "../apiFunction"

const useLogin = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: userLogin,
    gcTime: 0,
    onError: error => {
      if (error instanceof AxiosError && error.response) {
        const errorMessageKey = Object.keys(error?.response.data.errors)[0]
        const errorMessage = error?.response.data.errors[errorMessageKey][0]
        const message = `${errorMessageKey} ${errorMessage}`
        toastHandler(400, "Login Failed!", message, "Login Failed!")
      }
      return
    },
    onSuccess: data => {
      const userInfo = data.data?.user
      const access_token = userInfo?.token
      if (access_token) {
        localStorage.setItem("access_token", access_token)
      }
      toastHandler(200, "Well Done!", "login successfully", "Login - success")
      router.push("/articles")
    },
  })
  return mutation
}

export default useLogin
