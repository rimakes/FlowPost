import axios from 'axios'
import cron from 'node-cron'
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

export const scheduler = async (
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
