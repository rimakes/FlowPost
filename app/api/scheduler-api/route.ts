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

    console.log(scheduledPosts.length, '======')

    scheduledPosts?.forEach(async (post: any) => {
      const currentDate = new Date()

      const userAccount: any = await db.account.findFirst({
        where: {
          userId: post?.userId,
        },
      })

      if (
        // currentDate === post?.date &&
        // currentDate?.getHours() === post?.date?.getHours() &&
        // currentDate?.getMinutes() === post?.date?.getMinutes()
        true
      ) {
        try {
          await postOnLinkedIn(
            userAccount?.providerAccountId,
            post.content,
            userAccount?.access_token
          )
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
        } catch (error) {
          return NextResponse.json({ data: 'Not posted' }, { status: 200 })
        }
      }
    })

    return NextResponse.json({ data: 'Success' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
