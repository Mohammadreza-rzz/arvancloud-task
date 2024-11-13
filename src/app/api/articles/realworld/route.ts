import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { BaseApireq } from "@/utils/interceptors"

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')
    const token = req.nextUrl.searchParams.get("access_token")
    const offset = req.nextUrl.searchParams.get("offset") ?? "0"
    const limit = req.nextUrl.searchParams.get("limit") ?? "10"
    const res = await BaseApireq.get("/articles", {
      params: {
        limit,
        offset,
      },
      headers: { Authorization: `Token ${!!token ? token : access_token?.value}` },
    })

    if (res.status === 200) {
      return NextResponse.json({ ...res.data }, { status: 200 })
    }
    return NextResponse.json(
      { message: "somthing went wrong!." },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "somthing went wrong!." },
      { status: 400 }
    )
  }
}
