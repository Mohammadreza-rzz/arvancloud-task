import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import {
  apiAuthPrefix,
  AuthRoutes,
  defaultLoginRedirect,
  publicRoutes,
  staticAssets,
} from "./routes"

export async function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)
  const isStaticAsset = nextUrl.pathname.startsWith(staticAssets)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")
  const isLoggedin = !!(!!accessToken && !!accessToken.value)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }
  if (isStaticAsset) {
    return NextResponse.next()
  }
  if (isAuthRoute) {
    if (isLoggedin) {
      return NextResponse.redirect(new URL(defaultLoginRedirect, req.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedin && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
