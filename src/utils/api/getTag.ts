import { AxiosError } from "axios"

import { BaseApireq } from "../interceptors"

const getTag = async () => {
  try {
    const res = await BaseApireq.get("/tags")
    return {
      status: 200,
      message: "success",
      data: res?.data?.tags,
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

export default getTag
