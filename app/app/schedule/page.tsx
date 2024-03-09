import { db } from '@/lib/prisma'
import Scheduler from './_components/Scheduler'

const findPostByUserId = async () => {
  return db.linkedinPost.findMany({
    where: {
      author: {
        is: {
          name: 'Ricardo Sala',
        },
      },
    },
  })
}

export default async function SchedulePage() {
  const userPosts = await findPostByUserId()
  return (
    <>
      <Scheduler userPosts={userPosts} />
    </>
  )
}
