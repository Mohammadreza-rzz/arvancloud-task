import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { BaseApireq } from "@/utils/interceptors"

export async function DELETE(req: NextRequest) {
  try {
    
    const cookieStore =  await cookies()
    const access_token = cookieStore.get('access_token')
    const slug = req.nextUrl.searchParams.get("slug")
    const res = await BaseApireq.delete(`/articles/${slug}`, {
      headers: { Authorization: `Token ${access_token?.value}` },
    })

    if (res.status === 204) {
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
