import { db } from '@/lib/prisma'
import { TScheduledPost } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: any = await req?.json()
    const schedulePost: TScheduledPost = await db.scheduledPost.create({
      data: { ...body },
    })

    return NextResponse.json({ schedulePost }, { status: 200 })
  } catch (error: any) {
    console.log(error, '===error')
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function UPDATE(req: NextRequest) {
  try {
    const body: any = await req?.json()

    let checkScheduledPost = await db.scheduledPost.findUnique({
      where: {
        id: body?.id,
      },
    })

    if (!checkScheduledPost) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
    await db.scheduledPost.update({
      where: { id: body?.id },
      data: {
        ...body,
      },
    })
    checkScheduledPost = await db.scheduledPost.findUnique({
      where: {
        id: body?.id,
      },
    })
    return NextResponse.json({ checkScheduledPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const body: any = await req?.json()

    const scheduledPost = await db.scheduledPost.findFirst({
      where: {
        userId: body?.userId,
      },
    })
    return NextResponse.json({ scheduledPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body: any = await req?.json()
    const checkScheduledPost = await db.scheduledPost.findUnique({
      where: {
        id: body?.id,
      },
    })

    if (!checkScheduledPost) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
    await db.scheduledPost.delete({
      where: {
        id: checkScheduledPost?.id,
      },
    })
    return NextResponse.json({ delete: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
