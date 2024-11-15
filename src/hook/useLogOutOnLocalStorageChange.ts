import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function useLogoutOnLocalStorageChange() {
  const router = useRouter()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      localStorage.clear()
      router.push("/login")
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  return null
}
