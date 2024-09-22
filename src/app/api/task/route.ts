'use server'
import { PostModel } from '@/lib/mongoDB/models/Post'

//タスクの追加
export async function PUT(req: Request) {
  // await connectDB()
  const body = await req.json()

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
      { new: true },
    )

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
    return new Response(`Error: Failed to add data: ${body} `, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}

//特定のタスクの削除
export async function DELETE(req: Request) {
  // await connectDB()
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  const taskId = url.searchParams.get('taskId')

  // postIdまたはtaskIdがnullの場合にエラーメッセージを返す
  if (!postId || !taskId) {
    return new Response('Error: Missing property', { status: 400 })
  }

  try {
    const res = await PostModel.findOneAndUpdate(
      { customId: postId },
      { $pull: { taskFlow: { customId: taskId } } },
      { new: true }, // 変更後のデータを返すオプション
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

    return new Response('Success: Task deleted successfully', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    return new Response('Error: Failed to delete task', { status: 500 })
  }
}
