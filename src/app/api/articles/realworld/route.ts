import { BaseApireq } from "@/utils/interceptors"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  //   console.log(cookieStore.getAll(), "helloooo")
  try {
    const token = req.nextUrl.searchParams.get("access_token")
    const offset = req.nextUrl.searchParams.get("offset") ?? "0"
    const limit = req.nextUrl.searchParams.get("limit") ?? "10"
    console.log(offset, limit, "limit , offset")
    const res = await BaseApireq.get("/articles", {
      params: {
        limit: limit,
        offset: offset,
      },
      headers: { Authorization: `Token ${token}` },
    })

    if (res.status === 200) {
      return NextResponse.json({ ...res.data }, { status: 200 })
    }
    return NextResponse.json(
      { message: "somthing went wrong!." },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: "somthing went wrong!." },
      { status: 400 },
    )
  }
}
