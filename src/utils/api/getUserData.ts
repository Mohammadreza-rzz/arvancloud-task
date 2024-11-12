import axios from "axios"

const getUserData = async (access_token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_BASE_URL}/api/getCurrentUser`,
    {
      params: {
        access_token,
      },
    }
  )
  return res.data
}

export default getUserData
