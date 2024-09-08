import mongoose from 'mongoose'

const mongoURL = process.env.NEWT_PUBLIC_MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL as string)
    console.log('succecc mongoDB')
  } catch (err) {
    console.log('Failure:Unconnected to MongoDB')
    throw new Error()
  }
}

export default connectDB
