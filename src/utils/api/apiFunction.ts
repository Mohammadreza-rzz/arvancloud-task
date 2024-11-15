import { baseRequest, baseRequestWithToken } from "./interceptors"

type userRegisterReqBody = {
  user: { email: string; password: string; username: string }
}

type userLoginReqBody = {
  user: { email: string; password: string }
}

type addArticleReqBody = {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

type editArticleReqBody = {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
  slug: string
}

export const userRegisterApi = (reqBody: userRegisterReqBody) => {
  return baseRequest.post("/users", reqBody)
}

export const addArticleApi = (reqBody: addArticleReqBody) => {
  const token = localStorage.getItem("access_token")
  return baseRequest.post("/articles", reqBody, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const EditArticleApi = (reqBody: editArticleReqBody) => {
  const token = localStorage.getItem("access_token")
  return baseRequest.put(`/articles/${reqBody.slug}`, reqBody, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const userLogin = (reqBody: userLoginReqBody) => {
  return baseRequest.post("/users/login", reqBody)
}

export const getArticles = (
  offset: string | undefined = "0",
  limit: string | undefined = "10",
) => {
  const token = localStorage.getItem("access_token")
  return baseRequest.get(`/articles`, {
    params: {
      limit,
      offset,
    },
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const getArticleBySlug = (slug: string) => {
  const token = localStorage.getItem("access_token")
  return baseRequest.get(`/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const deleteArticleApi = (slug: string) => {
  const token = localStorage.getItem("access_token")
  return baseRequest.delete(`/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const getuserApi = () => {
  const token = localStorage.getItem("access_token")
  return baseRequest.get("/user", {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const getTagsApi = () => {
  return baseRequest.get("/tags")
}
