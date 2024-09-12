import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

//タスクの追加
export async function PUT(req: Request) {
  await connectDB()
  const body = await req.json()
  console.log(body)

  try {
    await PostModel.findOneAndUpdate(
      {
        customId: body.customId,
      },
      {
        $push: {
          taskFlow: body.taskFlow,
        },
      },
    )

    return new Response('Success: Data added successfully', { status: 200 })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response(`Error: Failed to add data: ${body} `, { status: 500 })
  }
}

//特定のタスクの削除
export async function DELETE(req: Request) {
  await connectDB()
  const query = await req.json()

  try {
    const res = await PostModel.findOneAndUpdate(
      {
        customId: query.postId,
      },
      {
        $pull: {
          taskFlow: { customId: query.taskId },
        },
      },
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
