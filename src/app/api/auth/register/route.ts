import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

import { generateAccessToken, generateRefreshToken } from "@/libs/jwt"
import { connectMongoDB } from "@/libs/mongodb"
import User from "@/models/register-input.model"

// Handle the POST request for registration
export async function POST(req: Request) {
  const body = await req.json()
  const { email, username, password } = body

  // Validate inputs
  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 422 }
    )
  }

  // Connect to the database
  await connectMongoDB()

  // Check if the user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    )
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create the new user
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  })
  await newUser.save()

  // Generate tokens
  const accessToken = generateAccessToken(newUser.id.toString())
  const refreshToken = generateRefreshToken(newUser.id.toString())

  // Respond with user data and tokens
  return NextResponse.json(
    {
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    },
    { status: 201 }
  )
}
