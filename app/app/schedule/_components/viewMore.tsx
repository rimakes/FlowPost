import React from 'react'

interface viewPostType {
  betweenDates: any
  selectedDraftId: any
}

const ViewMore = ({ betweenDates, selectedDraftId }: viewPostType) => {
  return betweenDates.map((item: any, key: number) => {
    console.log(item)
    if (key === selectedDraftId) {
      return (
        <>
          <div>
            {/* <div className='fixed inset-0 z-50 grid w-screen h-screen p-4 place-items-center bg-gray-700/75 sm:p-6 lg:p-8'>
        <div className='relative w-full max-w-2xl mx-auto overflow-hidden bg-white shadow-xl rounded-xl'> */}
            <div className='relative w-full mx-auto overflow-hidden bg-white rounded-xl'>
              <div className='max-h-[83vh] lg:max-h-[83vh]'>
                <div className='px-4 py-5 sm:px-6'>
                  <div className='flex items-center justify-between gap-6'>
                    <p className='flex-1 min-w-0 text-lg font-semibold text-gray-900 truncate'>
                      View Post
                    </p>
                  </div>
                </div>
                <div className='px-4 sm:py-2 sm:px-6 overflow-y-auto max-h-[68vh] lg:max-h-[68vh]'>
                  <div className='space-y-6'>
                    <div className='px-4 py-2.5 rounded-lg bg-success-50 ring-1 ring-success-200 ring-inset gap-2 flex items-center justify-center'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-success-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span className='text-sm font-semibold text-success-600'>
                        Scheduled → March 02 • 09:00 AM
                      </span>
                    </div>
                    <div className='relative'>
                      <div
                        className='flex items-center justify-center'
                        id='pdfDocument'
                      ></div>
                    </div>
                    <p className='text-base font-normal text-gray-900'>
                      <textarea
                        readOnly={true}
                        rows={20}
                        className='resize-none block w-full h-full p-0 text-gray-900 border-none appearance-none resize-y placeholder:text-gray-500 focus:ring-0 caret-blue-500 focus:outline-none'
                      >
                        {item?.content}
                      </textarea>
                    </p>
                    <hr className='border-gray-200' />
                    <div className='flex flex-wrap items-center gap-y-1 gap-x-2'>
                      <span className='text-sm font-medium text-gray-500'>
                        Last edited Mar 1, 2024, 5:51 PM
                      </span>
                      <span className='text-sm font-medium text-gray-500'>
                        •
                      </span>
                      <span className='text-sm font-medium text-gray-500'>
                        1088 characters
                      </span>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-5 sm:px-6'>
                  <div className='flex items-center gap-4 sm:justify-between'>
                    <a
                      type='button'
                      className='inline-flex w-full sm:ml-auto sm:w-auto items-center justify-center gap-2 transition-all duration-150 rounded-full bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 group shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      href='/write?post_id=2ca5dde7-a768-4190-b0a1-0f15ba4a4ebd'
                    >
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 -ml-0.5'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                      </svg>
                      Edit
                    </a>
                    <button
                      type='button'
                      className='inline-flex w-full sm:w-auto items-center justify-center gap-2 transition-all duration-150 rounded-full bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 group shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  })
}

export default ViewMore
