import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("access_token")
    return NextResponse.json(
      { message: "You have successfully logged out." },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: "logout failed" }, { status: 400 })
  }
}
