import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const newPost = new PostModel({
      customId: body.customId,
      userId: body.userId,
      name: body.name,
      event: body.event,
      startDate: body.startDate,
      endDate: body.endDate,
      region: body.region,
    })

    await newPost.save()
    return new Response('Success: Data added successfully', { status: 200 })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response('Error: Failed to add data', { status: 500 })
  }
}
