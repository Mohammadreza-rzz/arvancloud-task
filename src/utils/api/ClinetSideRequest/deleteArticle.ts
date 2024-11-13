import axios from "axios"

const deleteArticles = async (slug: string) => {
  try {
    const res = await axios.delete(`/api/articles/deleteArticles`, {
      params: {
        slug,
      },
    })
    return {
      data: res.data,
      status: 200,
      message: "Article deleted successfuly",
    }
  } catch (err) {
    return {
      data: err,
      status: 400,
      message: "Something went wrong, please try again later!",
    }
  }
}

export default deleteArticles
