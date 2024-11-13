import axios, { AxiosError } from "axios"
import { cookies } from "next/headers"

import { articlesFormatter } from "@/utils/formatter"

const getAllArticles = async (slug?: string) => {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")
    if (access_token?.value) {
      const res = await axios.get(
        `${process.env.NEXT_BASE_URL}/api/articles/getArticleBySlug`,
        {
          params: {
            access_token: access_token?.value,
            slug,
          },
        }
      )
      return {
        status: 200,
        message: "success",
        data: {
          article: articlesFormatter([res.data.article]),
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
