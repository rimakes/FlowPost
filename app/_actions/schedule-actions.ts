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
    content: 'Post on 42342313',
    time: new Date().setMinutes(new Date().getMinutes()),
  },
  {
    content: 'Post on332 14',
    time: new Date().setMinutes(new Date().getMinutes()),
  },
]

export const convertTimeTo24HourFormat = async (timeString: String) => {
  const [hoursStr, minutesStr] = timeString.split(':')
  let hours = parseInt(hoursStr)
  const minutes = parseInt(minutesStr)

  if (timeString.includes('PM') && hours < 12) {
    hours += 12
  } else if (timeString.includes('AM') && hours === 12) {
    hours = 0
  }

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date
}

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

    const config = {
      method: 'post',
      url: 'https://api.linkedin.com/v2/ugcPosts',
      headers: {
        Authorization:
          'Bearer AQUlC2s1mi0qnEMKt3pdESLkPxqJPGjVRDjgMpNThCPxDLfXSloGc1cdEZLMuFBqjIH3uhHhXPDcgxuZNMYEQ5bduup2hDX8oLPTVkhWCUED9ktGHI_fjdaea0ZCKKRXn9y5pU8oUu7hvTlPhQPmFHAE56pDB2X_gqJ1L2ffsc0AqmuT8NoyjUndjst1CdaDib7413gEfUoVOQ_wTa7a9UFeZCY8yfxF-64nmqJTKbYDGn4Dgh4ug0SqL2ygJ03xtiqLybJVaQEMr6aWG3iNcvW1IuXOT2f96HNedUQqCrbl8zlC4vtB8COXVV77YWzjN2-_N46Rd0L9-oWS0Is5ymxCy9DkGw',
        'Content-Type': 'application/json',
        Cookie:
          'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      data: JSON.stringify(body),
    }

    const response = await axios(config)

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
  scheduledPosts.forEach(async (post: any) => {
    // cron.schedule(`* * * * *`, async () => {
    // const currentTime = new Date()
    // const postTime = await convertTimeTo24HourFormat(post?.time)
    console.log('=====postTime')
    // if (
    //   currentTime.getHours() === postTime.getHours() &&
    //   currentTime.getMinutes() === postTime.getMinutes()
    // ) {
    await postOnLinkedIn(providerId, post.content, accessToken)
    // }
    // })
  })
}
