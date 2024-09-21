'use server'
import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

//特定のタスクの編集
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const { id } = params

  try {
    const res = await PostModel.findOneAndUpdate(
      {
        customId: body.postId,
        'taskFlow.customId': id,
      },
      {
        $set: { 'taskFlow.$': body.updateData },
      },
      { new: true },
    )

    if (!res) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response('Success: Data added successfully', { status: 200 })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response('Error: Failed to add data', { status: 500 })
  }
}
