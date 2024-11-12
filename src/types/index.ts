// forms
export type loginSchemaType = {
  email: string
  password: string
}

export type registerSchemaType = {
  username: string
  email: string
  password: string
}

// dropdown active state value
export type dropDownActivator = {
  id: string | number
  isActive: boolean
}

export type textInputProps = {
  username: string
  email: string
  password: string
  addArticleBox: string
}

export type articleDetailsFormSchemaType = {
  title: ""
  description: ""
  body: ""
  addArticleBox: ""
}

export type Option = {
  value: string
  label: string
}

export type ArticlesDataType = {
  author: {
    username: string
    bio: string | null
    image: string
    following: boolean
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}
