import { NextResponse } from "next/server"

import { verifyAccessToken } from "@/libs/jwt" // JWT verification function
import { connectMongoDB } from "@/libs/mongodb"
import Article from "@/models/articles.model" // Assuming Article model exists

export async function GET(req: Request) {
  const url = new URL(req.url)
  const size = Number(
    url.searchParams.get("size") ? url.searchParams.get("size") : "10"
  )
  const offset = Number(
    url.searchParams.get("offset") ? url.searchParams.get("offset") : "0"
  )

  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const articles = await Article.find().skip(offset).limit(size)

    return NextResponse.json(articles, { status: 200 })
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

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    const body = await req.json()
    const { title, body: articleBody, description, tags, author } = body

    if (!title || !articleBody || !description || !tags || !author) {
      return NextResponse.json(
        {
          message:
            "All fields (title, body, description, tags, author) are required",
        },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const newArticle = new Article({
      title,
      body: articleBody,
      description,
      tags,
      author,
    })

    await newArticle.save()

    return NextResponse.json(
      {
        message: "Article created successfully",
        article: newArticle,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}
