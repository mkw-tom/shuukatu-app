'use server'
import { PostModel } from '@/lib/mongoDB/models/Post'
import { UserModel } from '@/lib/mongoDB/models/User'
import connectDB from '@/lib/mongoDB/mongodb'

const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
//ユーザーの登録データを全件取得
export async function POST(req: Request) {
  await connectDB()

  // URLクエリパラメータからuserIdを取得
  // const url = new URL(req.url)
  // const userEmail = url.searchParams.get('email')
  const body = await req.json()

  if (!body.userEmail) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    // const hasheEmailAndSalt = await hash(userEmail, 12)
    const user = await UserModel.findOne({ email: body.userEmail })

    if (!user) {
      return new Response('Error: User not found', { status: 404 })
    }

    // DBのメールとハッシュ化されたメールを比較する
    // const isMatch = await compare(user.email, hasheEmailAndSalt) // DBに保存されているメールもハッシュ化されていると仮定

    // if (!isMatch) {
    //   return new Response('Error: User not found', { status: 404 })
    // }

    const userPosts = await PostModel.find({ userId: user?.customId })
    if (!userPosts) {
      console.log('userPosts are not found')
    }

    return new Response(JSON.stringify({ userData: user, postsData: userPosts }), {
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
