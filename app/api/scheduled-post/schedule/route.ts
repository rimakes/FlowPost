import { scheduler } from '@/app/_actions/schedule-actions'
import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

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
      body?.scheduledPost,
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
