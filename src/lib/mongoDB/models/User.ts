import mongoose, { Schema } from 'mongoose'

interface IUser extends Document {
  // authId: string
  // _id: string
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

const UserSchema = new Schema<IUser>(
  {
    // _id: {
    //   type: String,
    // },
    customId: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 40,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: '/noAvatar.png',
    },
    email: {
      type: String,
      required: true,
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
    userPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // PostのIDを参照
  },
  { timestamps: true },
)

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
