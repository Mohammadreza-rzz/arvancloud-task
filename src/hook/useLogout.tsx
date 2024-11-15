import { useRouter } from "next/navigation"
import { toastHandler } from "@/utils/helper"

const useLogout = () => {
  const router = useRouter()

  const logOuthandler = () => {
    localStorage.clear()
    router.push("/login")
    toastHandler(200, "", "You have successfully logged out.", "logout-success")
  }
  return logOuthandler
}

export default useLogout
