import type { Document } from "mongoose"
import mongoose, { Schema } from "mongoose"

export interface TagDocument extends Document {
  name: string
}

const tagSchema = new Schema<TagDocument>({
  name: { type: String, required: true, unique: true },
})

export default mongoose.models.Tag ||
  mongoose.model<TagDocument>("Tag", tagSchema)
