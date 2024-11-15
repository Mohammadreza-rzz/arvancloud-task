import { useRouter, useParams, usePathname } from "next/navigation"

import {
  apiAuthPrefix,
  AuthRoutes,
  defaultLoginRedirect,
  publicRoutes,
  staticAssets,
} from "../routes"

const useProtectRoute = () => {
  const pathname = usePathname()
  const router = useRouter()
  const token = localStorage.getItem("access_token")
  const isLoggedin = !!token

  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = AuthRoutes.includes(pathname)
  const isStaticAsset = pathname.startsWith(staticAssets)

  if (isPublicRoute) {
    return
  } else if (isAuthRoute && isLoggedin) {
    router.back()
  } else if (!isLoggedin && !isAuthRoute) {
    router.push("/login")
  }
}

export default useProtectRoute
