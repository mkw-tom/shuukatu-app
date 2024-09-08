import { PostModel } from '@/lib/mongoDB/models/Post'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const newPost = await new PostModel({
      customId: body.customId,
      userId: body.userId,
      name: body.name,
      event: body.event,
      startDate: body.startDate,
      endDate: body.endDate,
      region: body.region,
    })

    const post = await newPost.save()
    return new Response('success add data', { status: 200 })
  } catch (error) {
    return new Response('success add data', { status: 200 })
  }
}
