'use server'
import { PostModel } from '@/lib/mongoDB/models/Post'
import connectDB from '@/lib/mongoDB/mongodb'

//データの追加
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

    if (!newPost) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await newPost.save()

    return new Response(JSON.stringify({ message: 'Post updated successfully', newPost }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

///特定のデータを編集
export async function PUT(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const res = await PostModel.findOneAndUpdate(
      {
        customId: body.customId,
      },
      {
        $set: body,
      },
      { new: true },
    )

    if (!res) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'Post updated successfully', res }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

//ユーザーの登録データを全件取得
export async function GET(req: Request) {
  await connectDB()

  // URLクエリパラメータからuserIdを取得
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    // eslint-disable-next-line object-shorthand
    const posts = await PostModel.find({ userId: userId })
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function DELETE(req: Request) {
  await connectDB()

  // URLクエリパラメータからuserIdを取得
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')

  if (!postId) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    // eslint-disable-next-line object-shorthand
    const deletePost = await PostModel.findOneAndDelete({
      customId: postId,
    })

    return new Response(JSON.stringify(deletePost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
