// import { NextResponse, NextRequest } from "next/server"

// import {
//   apiAuthPrefix,
//   defaultLoginRedirect,
//   AuthRoutes,
//   publicRoutes,
//   staticAssets,
// } from "./routes"

// export default auth((req, res) => {
//   const { nextUrl } = req
//   const isLoggedin = !!req.auth
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)
//   const isStaticAsset = nextUrl.pathname.startsWith(staticAssets)

//   if (!!isApiAuthRoute) {
//     return NextResponse.next()
//   }
//   if (isStaticAsset) {
//     return NextResponse.next()
//   }
//   if (isAuthRoute) {
//     if (isLoggedin) {
//       return NextResponse.redirect(new URL(defaultLoginRedirect, req.url))
//     } else {
//       return NextResponse.next()
//     }
//   }

//   if (!isLoggedin && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/auth/login", req.url))
//   } else {
//     return NextResponse.next()
//   }
// })

// middleware.js

import { NextResponse, NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Define the paths you want to protect
  const protectedPaths = ["/dashboard", "/profile"]

  const isProtectedRoute = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path),
  )

  // if (isProtectedRoute && !token) {
  //   // If no token is found and user tries to access a protected route, redirect to login
  //   const loginUrl = new URL("/login", req.url)
  //   return NextResponse.redirect(loginUrl)
  // }

  // Allow the request to proceed if authenticated or not accessing protected routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
