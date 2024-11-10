import { NextResponse } from "next/server"

import { verifyAccessToken } from "@/libs/jwt" // JWT verification function
import { connectMongoDB } from "@/libs/mongodb"
import Tag from "@/models/tag.model" // Assuming a Tag model exists

// Handle the GET and POST requests
export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const tags = await Tag.find()

    return NextResponse.json(tags, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]

  const body = await req.json()
  const { name } = body

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  if (!name) {
    return NextResponse.json(
      { message: "Tag name is required" },
      { status: 400 }
    )
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const newTag = new Tag({ name })
    await newTag.save()

    return NextResponse.json(
      { message: "Tag created successfully", tag: newTag },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}
