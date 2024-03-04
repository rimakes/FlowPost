import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import cron from 'node-cron'

const postOnLinkedIn = async (
  providerAccountId: String,
  content: String,
  accessToken: String | null
) => {
  try {
    const body = {
      author: `urn:li:person:${providerAccountId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    }

    const url = 'https://api.linkedin.com/v2/ugcPosts'
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }

    const response = await axios.post(url, body, {
      headers,
      timeout: 500000,
    })

    console.log('Post successfully posted on LinkedIn:', response?.data?.id)
  } catch (error: any) {
    console.error('Error posting on LinkedIn:', error)
  }
}

const scheduler = async (
  scheduledPosts: any,
  providerId: any,
  accessToken: any
) => {
  scheduledPosts.forEach((post: any) => {
    cron.schedule(`* * * * *`, () => {
      const currentTime = new Date()
      const postTime = new Date(post.time)
      if (
        currentTime.getHours() === postTime.getHours() &&
        currentTime.getMinutes() === postTime.getMinutes()
      ) {
        postOnLinkedIn(providerId, post.content, accessToken)
      }
    })
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const userAccount = await db.account.findFirst({
      where: { userId: body?.userId },
    })

    if (!userAccount) {
      return NextResponse.json(false, { status: 400 })
    }

    await scheduler(body?.scheduledPosts,userAccount?.providerAccountId,userAccount?.access_token)

    return NextResponse.json({ message: 'Post scheduled' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
