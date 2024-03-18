// // @ts-ignore

// 'use client';
// import { Separator } from '@/components/ui/separator';
// import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import DraftModal from './_draftModal';
// import { signIn, useSession } from 'next-auth/react';
// import ViewMore from './_viewMore';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import { TLinkedinPost, TScheduledPost } from '@/types/types';
// import { apiClient } from '@/lib/apiClient';
// import { LinkedinPost } from '@prisma/client';
// import { SchedulerContext } from './SchedulerProvider';
// import { WeekSlider } from './WeekSlider';
// import { Eye } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// type userPostsProps = {
//     userPosts: TLinkedinPost[];
//     userSchedule: any;
// };

// type PostData = {
//     time: string;
//     date: Date;
//     id: string;
//     userId: string;
//     linkedinPostId: string;
//     linkedinPost?: LinkedinPost;
// };

// export default function Scheduler({ userPosts, userSchedule }: userPostsProps) {
//     const { data } = useSession();
//     const [accountLinked, setAccountLinked] = useState(false);
//     const [selectedDraftId, setSelectedDraftId] = useState<number>();

//     const {
//         onNextWeek: onNext,
//         onPrevWeek: onPrev,
//         startDate,
//         endDate = 'asdf',
//     } = useContext(SchedulerContext);

//     const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
//     const [betweenDates, setBetweenDates] = useState<PostData[]>([]);
//     const [viewMoreModal, setViewMoreModal] = useState(false);
//     const [editDetailsModal, setEditDetailsModal] = useState(false);
//     const [scheduledPosts, setScheduledPosts] = useState<TScheduledPost[]>([]);
//     const [isOpen, setIsOpen] = useState<boolean | null | number>();
//     const [times, setTimes] = useState<string[]>([]);
//     const popoverRef = useRef<HTMLUListElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 popoverRef.current &&
//                 !popoverRef.current.contains(event.target as Node)
//             ) {
//                 setIsOpen(null);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const getDates = (startDate: string, endDate: string) => {
//         const dateList = [];
//         const currentDate = new Date(startDate);
//         const end = new Date(endDate);

//         while (currentDate <= end) {
//             dateList.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         return dateList;
//     };

//     useEffect(() => {
//         const datesBetween = getDates(startDate, endDate);
//         const data: PostData[] = datesBetween.map((date) => {
//             const getDataByDate = scheduledPosts?.find(
//                 (item: TScheduledPost) =>
//                     new Date(item?.date)?.toDateString() ===
//                     new Date(date?.toISOString())?.toDateString()
//             );

//             if (getDataByDate) {
//                 return {
//                     ...getDataByDate,
//                     linkedinPostId: getDataByDate?.linkedinPostId || '',
//                     date: new Date(date),
//                 };
//             } else {
//                 return {
//                     time: '',
//                     id: '',
//                     userId: '',
//                     createdAt: '',
//                     updatedAt: '',
//                     linkedinPostId: '',
//                     date: new Date(date),
//                 };
//             }
//         });
//         setBetweenDates(data);
//     }, [startDate, endDate, scheduledPosts]);

//     const checkLinkedInConnection = async () => {
//         try {
//             const response = await apiClient.post('/scheduled-post/schedule');
//             setAccountLinked(response?.data?.loginUser);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     /**
//      * api to create schedule post api
//      */

//     const handleCreateSchedulePost = async (selectedData: TScheduledPost) => {
//         try {
//             const { date, time, id } = selectedData;
//             const postData = {
//                 date,
//                 time,
//                 linkedinPostId: id,
//             };
//             await apiClient.post('/scheduled-post', postData);
//             handleGetSchedulePosts();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     /**
//      * api to fetch all scheduled post
//      */

//     const handleGetSchedulePosts = useCallback(async () => {
//         try {
//             const response = await apiClient.get('/scheduled-post');
//             setScheduledPosts(response?.data?.scheduledPost);
//             setTimes([]);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }, []);

//     useEffect(() => {
//         if (data?.user?.id) {
//             handleGetSchedulePosts();
//         }
//     }, [data, handleGetSchedulePosts]);

//     /**
//      * Api to delete / unschedule post
//      */
//     const handleDeleteSchedulePosts = async (
//         id: string,
//         deleteData: boolean
//     ) => {
//         try {
//             await apiClient.delete(
//                 `scheduled-post?id=${id}&deleteData=${deleteData}`
//             );
//             handleGetSchedulePosts();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     // if linkedin not connected then function will be called when clicked connect linkedin button
//     const handleLinkedinLogin = async () => {
//         const res = await signIn('linkedin');
//     };

//     const handleUpdateSchedulePost = async (selectedData: TScheduledPost) => {
//         try {
//             const response = await apiClient.put(
//                 `scheduled-post?id=${selectedData?.id}`,
//                 selectedData
//             );
//             handleGetSchedulePosts();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleTimeChange = (newValue: string, key: number) => {
//         const data = betweenDates?.map((item: PostData, index: number) => {
//             if (index === key) {
//                 return { ...item, time: newValue };
//             } else {
//                 return item;
//             }
//         });
//         setBetweenDates(data);
//         const { ...rest } = data[key];
//         const updatedPayload = { ...rest };
//         data[key] &&
//             data[key].linkedinPost &&
//             handleUpdateSchedulePost(updatedPayload);
//     };

//     const handleSelect = async (item: { id: string }, key: number) => {
//         let selectedData: PostData[] = betweenDates.map(
//             (items: PostData, index: number) => {
//                 if (index === selectedDraftId) {
//                     return {
//                         ...items,
//                         id: item?.id,
//                     };
//                 }
//                 return items;
//             }
//         );

//         const newUploadedData: TScheduledPost[] = selectedData?.filter(
//             (item: {}, key: number) => key === selectedDraftId
//         );

//         if (newUploadedData?.length) {
//             handleCreateSchedulePost(newUploadedData[0]);
//         }

//         setBetweenDates(selectedData);
//         setIsVoiceModalOpen(false);
//     };

//     const handleTimesChange = (newValue: string, key: number) => {
//         const updatedTimes = [...times];
//         updatedTimes[key] = newValue;
//         setTimes(updatedTimes);
//     };

//     const handleClickDraftBtn = (key: number) => {
//         setSelectedDraftId(key);
//     };

//     return (
//         <>
//             <div>
//                 <WeekSlider />

//                 <div className='my-[2rem]'>
//                     <Separator />
//                 </div>
//                 <div>
//                     <div className='lg:flex grid w-full gap-8 pb-8 h-full'>
//                         {betweenDates.map((item: PostData, key: number) => {
//                             return (
//                                 <div className='w-full' key={key}>
//                                     <div key={key} className='flex gap-[10px]'>
//                                         <div className='font-semibold text-[16px]'>
//                                             {new Date(
//                                                 item?.date
//                                             ).toLocaleString('en-US', {
//                                                 month: 'long',
//                                             })}
//                                         </div>
//                                         <div className='font-normal text-[14px] flex items-center'>
//                                             {new Date(item?.date).getDate() < 10
//                                                 ? '0'
//                                                 : ''}
//                                             {new Date(item?.date).getDate()}
//                                         </div>
//                                     </div>
//                                     <div className='w-full mt-[2rem] transition-all duration-150 bg-gray-50 border px-4 py-5 border-gray-300 border-dashed shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-1 min-h-[226px]'>
//                                         <div className='flex flex-col justify-between space-y-4'>
//                                             <div className='flex items-center justify-between gap-4'>
//                                                 <p className='text-sm font-medium text-gray-500'>
//                                                     <TimePicker
//                                                         clockIcon={null}
//                                                         clearIcon={null}
//                                                         closeClock={true}
//                                                         value={
//                                                             item?.time ||
//                                                             times[key]
//                                                         }
//                                                         onChange={(
//                                                             newValue: any
//                                                         ) => {
//                                                             handleTimesChange(
//                                                                 newValue,
//                                                                 key
//                                                             );
//                                                             handleTimeChange(
//                                                                 newValue,
//                                                                 key
//                                                             );
//                                                         }}
//                                                     />
//                                                 </p>
//                                             </div>
//                                             <div className='flex-1 flex items-center justify-center min-h-[100px]'>
//                                                 <p className='text-base italic font-medium text-gray-400 line-clamp-4'>
//                                                     {item?.linkedinPost?.content
//                                                         ? item?.linkedinPost
//                                                               ?.content
//                                                         : 'Empty...'}
//                                                 </p>
//                                             </div>
//                                             {!item?.linkedinPost?.content && (
//                                                 <div className='flex items-center gap-2'>
//                                                     <Dialog
//                                                         open={isVoiceModalOpen}
//                                                         onOpenChange={
//                                                             setIsVoiceModalOpen
//                                                         }
//                                                     >
//                                                         <DialogTrigger asChild>
//                                                             <div className='relative group w-full'>
//                                                                 <button
//                                                                     onClick={async () => {
//                                                                         checkLinkedInConnection();
//                                                                         handleClickDraftBtn(
//                                                                             key
//                                                                         );
//                                                                     }}
//                                                                     type='button'
//                                                                     className='flex items-center justify-center w-full p-2 text-sm font-medium leading-6 text-gray-500 transition-all duration-150 rounded-full bg-gray-50 group hover:text-gray-700 hover:ring-gray-200 ring-1 ring-transparent'
//                                                                     disabled={
//                                                                         !times[
//                                                                             key
//                                                                         ]
//                                                                     }
//                                                                 >
//                                                                     <span className='sr-only'>
//                                                                         Pick a
//                                                                         Draft
//                                                                     </span>
//                                                                     <svg
//                                                                         aria-hidden='true'
//                                                                         className='w-5 h-5 text-gray-400 group-hover:text-gray-500'
//                                                                         xmlns='http://www.w3.org/2000/svg'
//                                                                         viewBox='0 0 20 20'
//                                                                         fill='currentColor'
//                                                                     >
//                                                                         <path
//                                                                             fillRule='evenodd'
//                                                                             d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z'
//                                                                             clipRule='evenodd'
//                                                                         ></path>
//                                                                     </svg>
//                                                                 </button>
//                                                                 <span className='whitespace-nowrap absolute px-3 py-2 text-xs font-semibold text-white transition-all duration-200 scale-0 -translate-x-1/2 bg-gray-900 rounded-md -top-10 group-hover:scale-100 left-1/2'>
//                                                                     {times[key]
//                                                                         ? 'Pick a Draft'
//                                                                         : 'Select time first'}
//                                                                 </span>
//                                                             </div>
//                                                         </DialogTrigger>
//                                                         <DialogContent
//                                                             className={`${accountLinked ? 'max-w-full md:max-w-4xl' : ''}`}
//                                                         >
//                                                             <DraftModal
//                                                                 handleSelect={
//                                                                     handleSelect
//                                                                 }
//                                                                 userPosts={
//                                                                     userPosts
//                                                                 }
//                                                                 accountLinked={
//                                                                     accountLinked
//                                                                 }
//                                                                 setIsVoiceModalOpen={
//                                                                     setIsVoiceModalOpen
//                                                                 }
//                                                                 handleLinkedinLogin={
//                                                                     handleLinkedinLogin
//                                                                 }
//                                                             />
//                                                         </DialogContent>
//                                                     </Dialog>
//                                                 </div>
//                                             )}
//                                             {item.linkedinPost?.content && (
//                                                 <div className='flex items-center gap-2'>
//                                                     <Dialog
//                                                         open={viewMoreModal}
//                                                         onOpenChange={
//                                                             setViewMoreModal
//                                                         }
//                                                     >
//                                                         <DialogTrigger asChild>
//                                                             <Button
//                                                                 variant={
//                                                                     'ghost'
//                                                                 }
//                                                                 onClick={() => {
//                                                                     setViewMoreModal(
//                                                                         true
//                                                                     );
//                                                                     handleClickDraftBtn(
//                                                                         key
//                                                                     );
//                                                                 }}
//                                                                 className=''
//                                                             >
//                                                                 <Eye />
//                                                             </Button>
//                                                         </DialogTrigger>
//                                                         <DialogContent
//                                                             className={`${accountLinked ? 'max-w-full md:max-w-4xl' : ''}`}
//                                                         >
//                                                             <ViewMore
//                                                                 data={item}
//                                                                 setEditDetailsModal={
//                                                                     setEditDetailsModal
//                                                                 }
//                                                                 betweenDates={
//                                                                     betweenDates
//                                                                 }
//                                                                 selectedDraftId={
//                                                                     selectedDraftId
//                                                                 }
//                                                                 setViewMoreModal={
//                                                                     setViewMoreModal
//                                                                 }
//                                                             />
//                                                         </DialogContent>
//                                                     </Dialog>

//                                                     <div className='relative group w-full'>
//                                                         <button
//                                                             className='flex items-center justify-center w-full p-2 text-sm font-medium leading-6 text-gray-500 transition-all duration-150 rounded-full bg-gray-50 group hover:text-gray-700 hover:ring-gray-200 ring-1 ring-transparent'
//                                                             onClick={() => {
//                                                                 if (
//                                                                     isOpen ===
//                                                                     key
//                                                                 ) {
//                                                                     setIsOpen(
//                                                                         null
//                                                                     );
//                                                                 } else {
//                                                                     setIsOpen(
//                                                                         key
//                                                                     );
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <svg
//                                                                 aria-hidden='true'
//                                                                 className='w-5 h-5 text-gray-400 group-hover:text-gray-500'
//                                                                 xmlns='http://www.w3.org/2000/svg'
//                                                                 viewBox='0 0 20 20'
//                                                                 fill='currentColor'
//                                                             >
//                                                                 <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
//                                                             </svg>
//                                                         </button>
//                                                         {isOpen == key && (
//                                                             <ul
//                                                                 ref={popoverRef}
//                                                                 className='absolute text-gray-700 pt-1'
//                                                             >
//                                                                 <li>
//                                                                     <button
//                                                                         onClick={() =>
//                                                                             handleDeleteSchedulePosts(
//                                                                                 item?.id,
//                                                                                 false
//                                                                             )
//                                                                         }
//                                                                         className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-2 flex whitespace-no-wrap gap-[5px] cursor-pointer'
//                                                                     >
//                                                                         <svg
//                                                                             aria-hidden='true'
//                                                                             className='w-5 h-5 text-gray-500 group-hover:text-gray-600'
//                                                                             xmlns='http://www.w3.org/2000/svg'
//                                                                             viewBox='0 0 20 20'
//                                                                             fill='currentColor'
//                                                                         >
//                                                                             <path
//                                                                                 fill-rule='evenodd'
//                                                                                 d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
//                                                                                 clip-rule='evenodd'
//                                                                             ></path>
//                                                                         </svg>{' '}
//                                                                         <span className='text-[16px]'>
//                                                                             Unschedule
//                                                                         </span>
//                                                                     </button>
//                                                                 </li>
//                                                                 <li>
//                                                                     <button
//                                                                         onClick={() =>
//                                                                             handleDeleteSchedulePosts(
//                                                                                 item?.id,
//                                                                                 true
//                                                                             )
//                                                                         }
//                                                                         className='w-full bg-gray-200 hover:bg-gray-400 py-2 px-2 flex whitespace-no-wrap gap-[5px] cursor-pointer'
//                                                                     >
//                                                                         <svg
//                                                                             aria-hidden='true'
//                                                                             className='w-5 h-5 text-gray-500 group-hover:text-gray-600'
//                                                                             xmlns='http://www.w3.org/2000/svg'
//                                                                             viewBox='0 0 20 20'
//                                                                             fill='currentColor'
//                                                                         >
//                                                                             <path
//                                                                                 fill-rule='evenodd'
//                                                                                 d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
//                                                                                 clip-rule='evenodd'
//                                                                             ></path>
//                                                                         </svg>{' '}
//                                                                         <span className='text-[16px]'>
//                                                                             Delete
//                                                                         </span>
//                                                                     </button>
//                                                                 </li>
//                                                             </ul>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
