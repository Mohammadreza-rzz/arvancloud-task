import type { Document } from "mongoose"
import mongoose, { Schema } from "mongoose"

interface Tag {
  name: string
}

interface Article extends Document {
  title: string
  body: string
  description: string
  tags: Tag[]
  author: string
  createdAt: Date
  updatedAt: Date
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { _id: false }
)

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [TagSchema], required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const ArticleModel =
  mongoose.models.Article || mongoose.model<Article>("Article", ArticleSchema)

export default ArticleModel
