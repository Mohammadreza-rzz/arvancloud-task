import { baseRequest } from "./interceptors"

type userRegisterReqBody = {
  user: { email: string; password: string; username: string }
}

type userLoginReqBody = {
  user: { email: string; password: string }
}

export const userRegisterApi = (reqBody: userRegisterReqBody) => {
  return baseRequest.post("/users", reqBody)
}

export const userLogin = (reqBody: userLoginReqBody) => {
  return baseRequest.post("/users/login", reqBody)
}
