import axios from "axios"
import { AxiosError } from "axios"
import { cookies } from "next/headers"
import { articlesFormatter } from "@/utils/formatter"

const getAllArticles = async (offset?: string, limit?: string) => {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")
    if (!!access_token?.value) {
      const res = await axios.get(
        `${process.env.NEXT_BASE_URL}/api/articles/realworld?${!!offset ? `offset=${offset}` : ""}${!!limit ? `&limit=${limit}` : ""}`,
        {
          params: {
            access_token: access_token?.value,
          },
        },
      )
      return {
        status: 200,
        message: "success",
        data: {
          articles: articlesFormatter(res.data.articles),
          articlesCount: res.data?.articlesCount ?? 0,
        },
      }
    }
    return {
      status: 422,
      message: "Your session has ended, please log in again.",
      data: null,
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        status: 400,
        message: "somthing went wrong!.",
        data: error.response.data,
      }
    }
  }
}

export default getAllArticles
