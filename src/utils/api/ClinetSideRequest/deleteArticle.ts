import axios from "axios"

const deleteArticles = async (slug: string) => {
  const res = await axios.delete(`/api/articles/deleteArticles`, {
    params: {
      slug,
    },
  })
  return res.data
}

export default deleteArticles
