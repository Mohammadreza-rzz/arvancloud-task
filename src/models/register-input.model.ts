import type { Document, Model } from "mongoose"
import mongoose, { Schema } from "mongoose"

// Define the TypeScript interface for the User
export interface IUser extends Document {
  email: string
  username: string
  password: string
}

// Define the Mongoose schema for the User model
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User
