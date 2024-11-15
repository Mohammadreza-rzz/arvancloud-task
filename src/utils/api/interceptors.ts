import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export const baseRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
})

// Create an Axios instance (optional)
export const baseRequestWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
})

baseRequestWithToken.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token")

    if (token) {
      config.headers["Authorization"] = `Token  ${token}`
    }

    return config
  },
  error => {
    console.log("Your session has ended, please log in again.")
    return Promise.reject(error)
  },
)
