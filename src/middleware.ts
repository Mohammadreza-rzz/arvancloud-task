import { NextResponse, NextRequest } from "next/server"
import {
  apiAuthPrefix,
  defaultLoginRedirect,
  AuthRoutes,
  publicRoutes,
  staticAssets,
} from "./routes"
import { cookies } from "next/headers"
import { checkTokenExpiry } from "./libs/jwt"
import { BaseApireq } from "./utils/interceptors"

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  let isLoggedin

  console.log(nextUrl, "dasdsadsa")
  //check mikoni aya dar header token darimya na aghar token bood va refresh token nabood   va ....
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)
  const isStaticAsset = nextUrl.pathname.startsWith(staticAssets)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")
  const refreshToken = cookieStore.get("refresh_token")

  if (!!accessToken?.value) {
    const isExpireToken = checkTokenExpiry(accessToken.value)
    if (!!isExpireToken) {
      isLoggedin = true
    } else if (!!refreshToken?.value) {
      // call refreshtoken api
      const res = await BaseApireq.post("/api/auth/refreshToken", {
        refreshToken: refreshToken?.value,
      })
      if (res.status === 200) {
        const newAccessToken = res.data.accessToken
        const response = NextResponse.next()
        response.cookies.set("access_token", newAccessToken, {
          secure: true,
          httpOnly: true,
          path: "/",
          maxAge: 3600, // New access token expiry (1 hour)
        })
      }
    } else {
      isLoggedin = false
    }
  } else {
    isLoggedin = false
  }

  if (!!isApiAuthRoute) {
    return NextResponse.next()
  }
  if (isStaticAsset) {
    return NextResponse.next()
  }
  if (isAuthRoute) {
    if (isLoggedin) {
      return NextResponse.redirect(new URL(defaultLoginRedirect, req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (!isLoggedin && !isPublicRoute) {
    console.log("aaaaaaaaaaa")
    return NextResponse.redirect(new URL("/login", req.url))
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
