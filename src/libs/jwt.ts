import jwt from "jsonwebtoken"
import { decode } from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

// Generate an access token
export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" })
}

// Generate a refresh token
export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" })
}

// Verify the access token
export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

// Verify the refresh token
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET)
}




export const checkTokenExpiry = (accessToken: string) => {
  const decoded = decode(accessToken) as { exp: number } | null;
  if (decoded && decoded.exp) {
    const expirationDate = new Date(decoded.exp * 1000); // Convert exp to Date object
    if (expirationDate > new Date()) {
      return true; // Token is still valid
    }
  }
  return false; // Token has expired
};