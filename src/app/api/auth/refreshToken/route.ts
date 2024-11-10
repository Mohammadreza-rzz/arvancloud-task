import { NextResponse } from "next/server"

import { generateAccessToken, verifyRefreshToken } from "@/libs/jwt"

// Handle the POST request for refreshing the access token
export async function POST(req: Request) {
  const body = await req.json()
  const { refreshToken } = body

  // Validate input
  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is required" },
      { status: 400 }
    )
  }

  try {
    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken) as { userId: string }

    // Generate a new access token
    const newAccessToken = generateAccessToken(decoded.userId)

    // Return the new access token
    return NextResponse.json(
      {
        accessToken: newAccessToken,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 403 }
    )
  }
}
