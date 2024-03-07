import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { postOnLinkedIn } from '../../_actions/schedule-actions'
// This endpoint will check the scheduled posts, if there is any post then it'll post on linkedin.

export async function GET(req: NextRequest) {
  try {
    const startOfDay = new Date()
    startOfDay.setUTCHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setUTCHours(23, 59, 59, 999)

    let scheduledPosts = await db.scheduledPost.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
        scheduledPost: {
          is: {
            publishedAt: null,
            published: false,
          },
        },
      },
    })

    scheduledPosts?.forEach(async (post: any) => {
      const currentDate = new Date()

      const userAccount: any = await db.account.findFirst({
        where: {
          userId: post?.userId,
        },
      })

      if (
        currentDate === post?.date &&
        currentDate?.getHours() === post?.date?.getHours() &&
        currentDate?.getMinutes() === post?.date?.getMinutes()
      ) {
        const posted = await postOnLinkedIn(
          userAccount?.providerAccountId,
          post?.scheduledPost?.content,
          userAccount?.access_token
        )

        if (posted?.data?.id) {
          const scheduledPost = {
            ...post.scheduledPost,
            published: true,
            publishedAt: new Date(),
          }
          await db.scheduledPost.update({
            where: { id: post?.id },
            data: {
              scheduledPost,
            },
          })
          return NextResponse.json({ data: 'Success' }, { status: 200 })
        }
        return NextResponse.json({ data: 'Error' }, { status: 400 })
      }
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
