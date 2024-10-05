import mongoose, { Schema } from 'mongoose'
// const mongoose = require('mongoose');

interface IUser extends Document {
  // authId: string
  username: string
  password: string
  profilePicture: string
  email: string
  isAdmin: boolean
  allCompanies: []
  passCompanies: []
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    // authId: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 25,
      // unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 40,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: '/default_icon.png',
    },
    email: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    allCompanies: {
      type: [Object],
      default: [],
    },
    passCompanies: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true },
)

export const UserModel = mongoose.models.User || mongoose.model(`User`, UserSchema)
