import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { BaseApireq } from "@/utils/interceptors"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const access_token = cookieStore.get("access_token")
  try {
    const token = req.nextUrl.searchParams.get("access_token")

    const res = await BaseApireq.get("/user", {
      headers: {
        Authorization: `Token ${token || access_token?.value}`,
      },
    })

    if (res.status === 200) {
      return NextResponse.json({ data: res.data.user }, { status: 200 })
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
