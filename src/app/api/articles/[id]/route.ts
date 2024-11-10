import { NextResponse } from "next/server"

import { verifyAccessToken } from "@/libs/jwt"
import { connectMongoDB } from "@/libs/mongodb"
import Article from "@/models/articles.model"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  if (!id) {
    return NextResponse.json(
      { message: "Article ID is required" },
      { status: 400 }
    )
  }

  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const article = await Article.findById(id)

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(article, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  if (!id) {
    return NextResponse.json(
      { message: "Article ID is required" },
      { status: 400 }
    )
  }

  const body = await req.json()
  const { title, body: articleBody, description, tags } = body

  if (!title || !articleBody || !description || !tags) {
    return NextResponse.json(
      { message: "All fields (title, body, description, tags) are required" },
      { status: 400 }
    )
  }

  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, body: articleBody, description, tags },
      { new: true }
    )

    if (!updatedArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedArticle, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  if (!id) {
    return NextResponse.json(
      { message: "Article ID is required" },
      { status: 400 }
    )
  }

  const authHeader = req.headers.get("Authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 401 })
  }

  try {
    verifyAccessToken(token)

    await connectMongoDB()
    const article = await Article.findByIdAndDelete(id)

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    )
  }
}
