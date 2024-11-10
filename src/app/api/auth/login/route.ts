import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

import { generateAccessToken, generateRefreshToken } from "@/libs/jwt"
import { connectMongoDB } from "@/libs/mongodb"
import User from "@/models/register-input.model"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    )
  }

  await connectMongoDB()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 })
  }

  const accessToken = generateAccessToken(user.id.toString())
  const refreshToken = generateRefreshToken(user.id.toString())

  return NextResponse.json(
    {
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    },
    { status: 200 }
  )
}
