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
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const userId: any = searchParams.get('UserId')
    const scheduledPost = await db.scheduledPost.findMany({
      where: {
        userId,
      },
    })
    return NextResponse.json({ scheduledPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const id: any = searchParams.get('id')
    const deleteData: any = searchParams.get('deleteData')
    const checkScheduledPost: any = await db.scheduledPost.findUnique({
      where: {
        id,
      },
    })

    const postId: string = checkScheduledPost?.scheduledPost?.id

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

    if (deleteData) {
      await db.linkedinPost.delete({
        where: {
          id: postId,
        },
      })
      return NextResponse.json({ delete: true }, { status: 200 })
    }
    return NextResponse.json({ unscheduled: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
