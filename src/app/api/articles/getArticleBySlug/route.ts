import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { BaseApireq } from "@/utils/interceptors"

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("access_token")
    const slug = req.nextUrl.searchParams.get("slug")
    const res = await BaseApireq.get(`/articles/${slug}`, {
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
