import type { Schema } from 'mongoose'

interface IUser extends Document {
  // authId: string
  customId: string
  username: string
  password: string
  profilePicture: string
  email: string
  isAdmin: boolean
  allCompanies: []
  passCompanies: []
  userPosts: [Schema.Types.ObjectId]
  createdAt: Date
  updatedAt: Date
}

export interface UserType {
  // authId: string
  customId: string
  username: string
  password: string
  profilePicture: string
  email: string
  isAdmin: boolean
  allCompanies: []
  passCompanies: []
  userPosts: PostType[]
  // createdAt: Date
  // updatedAt: Date
}
