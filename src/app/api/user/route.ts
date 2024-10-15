'use server'
import { AnalysisModel } from '@/lib/mongoDB/models/Analysis'
import { PostModel } from '@/lib/mongoDB/models/Post'
import { UserModel } from '@/lib/mongoDB/models/User'
import connectDB from '@/lib/mongoDB/mongodb'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

//ユーザーの登録データを全件取得
export async function POST(req: NextRequest) {
  await connectDB()

  const decoded = await getToken({ req, secret: process.env.JWT_SECRET })

  if (!decoded) {
    return new NextResponse(`unauthoriz ${decoded}`, { status: 401 })
  } else {
    // console.dir(decoded)
    console.log(`success authoriz!!`)
  }
  const userEmail = decoded?.email

  if (!userEmail) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    // const hasheEmailAndSalt = await hash(userEmail, 12)
    const user = await UserModel.findOne({ email: userEmail })

    if (!user) {
      return new Response('Error: User not found', { status: 404 })
    }

    const userPosts = await PostModel.find({ userId: user?.customId })
    if (!userPosts) {
      console.log('posts data is not found')
    }

    const userAnalysis = await AnalysisModel.findOne({ userId: user?.customId })
    if (!userPosts) {
      console.log('Analysis data is not found')
    }

    return new NextResponse(
      JSON.stringify({ userData: user, postsData: userPosts, analysisData: userAnalysis }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error updating post:', error)
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// export async function DELETE(req: Request) {
//   await connectDB()

//   // URLクエリパラメータからuserIdを取得
//   const url = new URL(req.url)
//   const postId = url.searchParams.get('postId')

//   if (!postId) {
//     return new Response('Error: Missing userId', { status: 400 })
//   }

//   try {
//     // eslint-disable-next-line object-shorthand
//     const deletePost = await PostModel.findOneAndDelete({
//       customId: postId,
//     })

//     return new Response(JSON.stringify(deletePost), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   } catch (error) {
//     console.error('Error updating post:', error)
//     return new Response(JSON.stringify({ error }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }
