'use server'
import { PostModel } from '@/lib/mongoDB/models/Post'

//特定のタスクの編集
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  // await connectDB()
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response('Success: Data added successfully', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response('Error: Failed to add data', { status: 500 })
  }
}
