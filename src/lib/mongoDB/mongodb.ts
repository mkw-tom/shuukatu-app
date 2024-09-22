import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URL
const VercelMongoURI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(VercelMongoURI as string)
    console.log('succecc mongoDB')
  } catch (err) {
    console.log('Failure:Unconnected to MongoDB')
    throw new Error()
  }
}

export default connectDB
