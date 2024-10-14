import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

//特定の企業データを取得
export async function GET(req: Request) {
  await connectDB()
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')

  if (!postId) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    await PostModel.findOne({
      customId: postId,
    })
    return new Response('Success: Data geted successfully', { status: 200 })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response('Error: Failed to get data', { status: 500 })
  }
}
