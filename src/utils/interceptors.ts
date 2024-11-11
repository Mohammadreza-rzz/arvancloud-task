import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
export const BaseApireq = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
})
