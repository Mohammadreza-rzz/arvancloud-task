import axios from "axios"

const getUserData = async () => {
  const res = await axios.get(`/api/getCurrentUser`)
  return res.data
}

export default getUserData
