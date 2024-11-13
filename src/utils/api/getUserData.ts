import axios from "axios"
import AxiosError from "axios"

const getUserData = async (access_token: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_BASE_URL}/api/getCurrentUser`,
      {
        params: {
          access_token,
        },
      },
    )
    return res.data
  } catch (error) {
    if (error instanceof AxiosError && error) {
      return {
        status: 400,
        message: "somthing went wrong!.",
        data: error,
      }
    }
  }
}

export default getUserData
