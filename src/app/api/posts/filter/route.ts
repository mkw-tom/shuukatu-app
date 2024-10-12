import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

//特定の企業データを取得
export async function GET(req: Request) {
  await connectDB()
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const type = url.searchParams.get('type')

  switch (type) {
    case 'progress':
      try {
        const res = (await PostModel.find({
          userId,
          completed: false,
          failed: false,
        })) as PostType[]
        if (!res) {
          return new Response('completed Data are not found', { status: 400 })
        }
        return new Response(JSON.stringify(res), { status: 200 })
      } catch (error) {
        return new Response('fetch error', { status: 500 })
      }
    case 'completed':
      try {
        const res = (await PostModel.find({ userId, completed: true })) as PostType[]
        if (!res) {
          return new Response('completed Data are not found', { status: 400 })
        }
        return new Response(JSON.stringify(res), { status: 200 })
      } catch (error) {
        return new Response('fetch error', { status: 500 })
      }

    case 'failed':
      try {
        const res = (await PostModel.find({ userId, failed: true })) as PostType[]
        if (!res) {
          return new Response('failed Data are not found', { status: 400 })
        }
        return new Response(JSON.stringify(res), { status: 200 })
      } catch (error) {
        return new Response('fetch error', { status: 500 })
      }
    case 'all':
      try {
        const res = (await PostModel.find({ userId })) as PostType[]
        if (!res) {
          return new Response('data is not found', { status: 400 })
        }
        return new Response(JSON.stringify(res), { status: 200 })
      } catch (error) {
        return new Response('fetch error', { status: 500 })
      }
    default:
      return new Response('Invalid request type', { status: 400 })
  }
  // const postId = url.searchParams.get('postId')

  // if (!postId) {
  //   return new Response('Error: Missing userId', { status: 400 })
  // }

  // try {
  //   await PostModel.findOne({
  //     customId: postId,
  //   })
  //   return new Response('Success: Data geted successfully', { status: 200 })
  // } catch (error) {
  //   console.error('Error saving data:', error)
  //   return new Response('Error: Failed to get data', { status: 500 })
  // }
}
