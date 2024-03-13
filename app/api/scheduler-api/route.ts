import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { postOnLinkedIn } from '../../_actions/schedule-actions'
import { TScheduledPost } from '@/types/types'

// This endpoint will check the scheduled posts, which will be called every time from cron job to find if there is any post to be posted on linkedin.
export async function GET(req: NextRequest) {
    try {
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

    // finding the posts from the start of the day till end of day
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


    // posting the each post on linkedin from the scheduledPosts (post that are supposed to be posted today as per their time)
    scheduledPosts?.forEach(async (post: TScheduledPost) => {
      const currentDate = new Date()
      const userAccount: any = await db.account.findFirst({
        where: {
          userId: post?.userId,
        },
      })

      if(Number(post?.scheduledPost?.time?.split(':')?.length) < 2){
        return NextResponse.json({ error: 'Time not found' }, { status: 500 })
      }

      const hours = Number(post?.scheduledPost?.time?.split(':')[0])
      const minutes = Number(post?.scheduledPost?.time?.split(':')[1])
      if (
        currentDate === post?.date &&
        currentDate?.getHours() === hours &&
        currentDate?.getMinutes() === minutes
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
    return NextResponse.json({ message: 'Scheduled'}, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
