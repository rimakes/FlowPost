'use client'
import { Heading } from '@/components/shared/Heading'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import DraftModal from './draftModal'

export default function Scheduler() {
  // Get current date
  const currentDate: any = new Date()
  const [accountLinked, setAccountLinked] = useState(true)

  const [startDate, setStartDate] = useState<any>(
    currentDate.toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState<any>(
    new Date(currentDate.setDate(currentDate.getDate() + 3))
      .toISOString()
      .split('T')[0]
  )
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [betweenDates, setBetweenDates] = useState<any>([])

  const getDates = (startDate: any, endDate: any) => {
    const dateList = []
    const currentDate = new Date(startDate)
    const end = new Date(endDate)

    while (currentDate <= end) {
      dateList.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dateList
  }

  useEffect(() => {
    const datesBetween = getDates(startDate, endDate)
    setBetweenDates(
      datesBetween.map((date) => {
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long', // abbreviated month name
          day: '2-digit', // two-digit day of the month
        })
      })
    )
  }, [startDate, endDate])

  const handleNext = () => {
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    newStartDate.setDate(newStartDate.getDate() + 4)
    newEndDate.setDate(newEndDate.getDate() + 4)
    setStartDate(newStartDate.toISOString().split('T')[0])
    setEndDate(newEndDate.toISOString().split('T')[0])
  }

  const handlePrevious = () => {
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    newStartDate.setDate(newStartDate.getDate() - 4)
    newEndDate.setDate(newEndDate.getDate() - 4)
    setStartDate(newStartDate.toISOString().split('T')[0])
    setEndDate(newEndDate.toISOString().split('T')[0])
  }

  // Format dates for display
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })

  // Get time zone of current date
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const currentYear = new Date().getFullYear()

  return (
    <>
      <div>
        <Separator />
        <Heading
          className='mt-6'
          title='Schedule'
          subtitle='Here are the posts scheduled for upcoming days.'
        />

        <section className='flex justify-between items-center'>
          <ChevronLeft
            onClick={handlePrevious}
            className='hover:bg-gray-200 rounded-full p-1.5'
            size={40}
          />
          <div className='flex justify-between items-center flex-col text-lg'>
            <p>
              {formattedStartDate} - {formattedEndDate}, {currentYear}
            </p>
            <p>{currentTimezone}</p>
          </div>
          <ChevronRight
            onClick={handleNext}
            className='hover:bg-gray-200 rounded-full p-1.5'
            size={40}
          />
        </section>

        <div className='my-[2rem]'>
          <Separator />
        </div>
        <div>
          <div className='flex w-full gap-8 pb-8 overflow-x-auto h-full'>
            {betweenDates.map((item: any, key: number) => {
              return (
                <div className='w-full'>
                  <div key={key} className='flex gap-[20px]'>
                    <div className='font-semibold text-[16px]'>
                      {item.split(',')[0]}
                    </div>
                    <div className='font-normal text-[14px] flex items-center'>
                      {item.split(',')[1]}
                    </div>
                  </div>
                  <div className='w-full mt-[2rem] transition-all duration-150 bg-gray-50 border px-4 py-5 border-gray-300 border-dashed shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-1 min-h-[226px]'>
                    <div className='flex flex-col justify-between space-y-4'>
                      <div className='flex items-center justify-between gap-4'>
                        <p className='text-sm font-medium text-gray-500'>
                          09:00 AM
                        </p>
                      </div>
                      <div className='flex-1 flex items-center justify-center min-h-[100px]'>
                        <p className='text-base italic font-medium text-gray-400'>
                          Empty...
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Dialog
                          open={isVoiceModalOpen}
                          onOpenChange={setIsVoiceModalOpen}
                        >
                          <DialogTrigger asChild>
                            <div className='relative group w-full'>
                              <button
                                type='button'
                                className='flex items-center justify-center w-full p-2 text-sm font-medium leading-6 text-gray-500 transition-all duration-150 rounded-full bg-gray-50 group hover:text-gray-700 hover:ring-gray-200 ring-1 ring-transparent'
                              >
                                <span className='sr-only'>Pick a Draft</span>
                                <svg
                                  aria-hidden='true'
                                  className='w-5 h-5 text-gray-400 group-hover:text-gray-500'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fill-rule='evenodd'
                                    d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z'
                                    clip-rule='evenodd'
                                  ></path>
                                </svg>
                              </button>
                              <span className='whitespace-nowrap absolute px-3 py-2 text-xs font-semibold text-white transition-all duration-200 scale-0 -translate-x-1/2 bg-gray-900 rounded-md -top-10 group-hover:scale-100 left-1/2'>
                                Pick a Draft
                              </span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className={`${accountLinked ? 'max-w-full md:max-w-4xl' : '' }`}>
                            <DraftModal accountLinked={accountLinked} setIsVoiceModalOpen={setIsVoiceModalOpen} />
                          </DialogContent>
                          </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
