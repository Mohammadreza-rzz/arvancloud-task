import { BaseApireq } from "@/utils/interceptors"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("access_token")
    const res = await BaseApireq.get("/user", {
      headers: { Authorization: `Token ${token}` },
    })

    if (res.status === 200) {
      return NextResponse.json({ data: res.data.user }, { status: 200 })
    }
    return NextResponse.json(
      { message: "somthing went wrong!." },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json({ message: "logout failed" }, { status: 400 })
  }
}
