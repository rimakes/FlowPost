'use client'
import { Heading } from '@/components/shared/Heading'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { secondaryFont } from '@/config/fonts'

export default async function Scheduler() {
  // Get current date
  const currentDate = new Date().toISOString().split('T')[0]

  // Initialize state with current date
  const [startDate, setStartDate] = useState(currentDate)
  const [endDate, setEndDate] = useState(currentDate)

  // Function to handle next button click
  const handleNext = () => {
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    newStartDate.setDate(newStartDate.getDate() + 1)
    newEndDate.setDate(newEndDate.getDate() + 1)
    setStartDate(newStartDate.toISOString().split('T')[0])
    setEndDate(newEndDate.toISOString().split('T')[0])
  }

  // Function to handle previous button click
  const handlePrevious = () => {
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    newStartDate.setDate(newStartDate.getDate() - 1)
    newEndDate.setDate(newEndDate.getDate() - 1)
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

        <Separator />
      </div>
    </>
  )
}
