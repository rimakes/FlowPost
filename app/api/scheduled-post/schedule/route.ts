import { scheduler } from '@/app/_actions/schedule-actions'
import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
const scheduledPosts = [
  {
    content: 'Post on 1121211',
    time: new Date().setMinutes(new Date().getMinutes() + 1),
  },
  {
    content: 'Post on 112qq2',
    time: new Date().setMinutes(new Date().getMinutes() + 2),
  },
  {
    content: 'Post on 13',
    time: new Date().setMinutes(new Date().getMinutes()),
  },
  {
    content: 'Post on 14',
    time: new Date().setMinutes(new Date().getMinutes()),
  },
]
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log(body, '===body')

    const userAccount = await db.account.findFirst({
      where: { userId: body?.userId },
    })

    if (!userAccount) {
      return NextResponse.json({ loginUser: false }, { status: 200 })
    }

    await scheduler(
      scheduledPosts,
      userAccount?.providerAccountId,
      userAccount?.access_token
    )

    return NextResponse.json(
      { message: 'Post scheduled', loginUser: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
