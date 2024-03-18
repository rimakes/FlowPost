import { apiClient } from '@/lib/apiClient';
import React, { useEffect, useState } from 'react';

interface props {
    setIsVoiceModalOpen: (modal: boolean) => void;
    handleLinkedinLogin: () => void;
    userPosts: any;
    handleSelect: (item: any, key: number) => void;
}

const DraftModal = ({
    setIsVoiceModalOpen,
    userPosts,
    handleSelect,
    handleLinkedinLogin,
}: props) => {
    const [accountLinked, setAccountLinked] = useState(false);

    useEffect(() => {
        const checkLinkedInConnection = async () => {
            try {
                const response = await apiClient.post(
                    '/scheduled-post/schedule'
                );
                setAccountLinked(response?.data?.loginUser);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        checkLinkedInConnection();
    }, []);

    return (
        <>
            {!accountLinked ? (
                <div className='relative w-full max-w-lg mx-auto overflow-hidden bg-white rounded-xl'>
                    <div className=' overflow-y-auto max-h-[80vh] lg:max-h-[80vh]'>
                        <div className='space-y-6'>
                            <img
                                className='w-64 h-auto mx-auto'
                                src='https://app.supergrow.ai/static/media/connect-account.a567f7aa36bef73fd70b61324c0339c3.svg'
                                alt=''
                            />
                            <div className='text-center'>
                                <p className='w-[full] mt-2 text-xl font-semibold text-gray-950'>
                                    Connect LinkedIn Account
                                </p>
                                <p className='max-w-sm mx-auto mt-2 text-base font-normal text-gray-600'>
                                    Connect your LinkedIn account to schedule
                                    and publish post.
                                </p>
                            </div>
                            <div className='flex flex-col gap-4 sm:justify-center sm:items-center sm:flex-row'>
                                <button
                                    onClick={handleLinkedinLogin}
                                    type='button'
                                    className='inline-flex items-center justify-center gap-2 transition-all duration-150 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 bg-blue-500 text-white'
                                >
                                    <svg
                                        aria-hidden='true'
                                        className='w-5 h-5'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z'></path>
                                    </svg>
                                    Connect LinkedIn Account
                                </button>
                                <button
                                    onClick={() => setIsVoiceModalOpen(false)}
                                    type='button'
                                    className='inline-flex items-center justify-center gap-2 transition-all duration-150 rounded-full bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold text-gray-700 shadow-xs ring-1 hover:text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50'
                                >
                                    Do It Later
                                </button>
                            </div>
                            <p className='max-w-sm mx-auto text-xs text-center text-gray-600'>
                                You will be redirected to LinkedIn to connect
                                your account.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='relative w-full mx-auto overflow-hidden bg-white rounded-xl'>
                    <div className='py-5'>
                        <div className='flex items-center justify-between gap-6'>
                            <p className='text-lg font-semibold text-gray-900 '>
                                Pick from Drafts
                            </p>
                            <button
                                type='button'
                                className='text-gray-400 bg-white rounded-lg hover:text-gray-500 focus:outline-none'
                            >
                                <span className='sr-only'>Close Modal</span>
                                {/* <svg aria-hidden="true" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> */}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='overflow-y-auto max-h-[80vh] lg:max-h-[80vh]'>
                            <div className='relative gap-4 columns-1 md:columns-2 sm:gap-6 first:mt-1'>
                                {userPosts.map((item: any, key: number) => {
                                    return (
                                        <div
                                            key={key}
                                            className='mb-[10px] overflow-hidden transition-all duration-150 bg-white border border-gray-200 shadow-xs rounded-xl hover:shadow-md hover:-translate-y-1'
                                        >
                                            <div className='px-4 py-5 space-y-6 sm:p-6'>
                                                <p className='text-base font-normal text-gray-900'>
                                                    {item?.content}
                                                </p>
                                                <hr className='border-gray-200' />
                                                <button
                                                    onClick={() =>
                                                        handleSelect(item, key)
                                                    }
                                                    type='button'
                                                    className='inline-flex items-center gap-2 text-sm font-medium leading-6 text-gray-500 transition-all duration-150 hover:text-blue-500'
                                                >
                                                    <svg
                                                        aria-hidden='true'
                                                        className='w-4 h-4'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        viewBox='0 0 2500 2500'
                                                        version='1.1'
                                                    >
                                                        <path
                                                            d='M 2005.444 1.477 C 1959.063 7.809, 1912.448 28.063, 1874 58.587 C 1869.325 62.299, 1822.525 108.152, 1770 160.484 C 886.618 1040.616, 823.988 1103.209, 818.573 1111.347 C 812.266 1120.826, 807.609 1131.803, 805.487 1142.192 C 804.667 1146.211, 783.886 1271.450, 759.309 1420.500 C 716.075 1682.691, 714.625 1691.923, 714.689 1704.500 C 714.761 1718.733, 716.444 1727.099, 721.801 1739.849 C 732.596 1765.540, 758.891 1786.308, 787.466 1791.710 C 792.892 1792.736, 798.909 1793.073, 806 1792.746 C 813.935 1792.382, 882.463 1780.378, 1086.500 1743.615 C 1235 1716.858, 1359.170 1694.287, 1362.434 1693.457 C 1370.996 1691.279, 1379.343 1687.417, 1388.670 1681.320 C 1395.684 1676.735, 1456.536 1616.076, 1818.609 1252.740 C 2050.581 1019.958, 2283.882 785.850, 2337.054 732.500 C 2433.616 635.615, 2442.475 626.192, 2455.874 606.128 C 2478.503 572.243, 2493.341 533.111, 2498.557 493.569 C 2500.290 480.431, 2500.524 435.423, 2498.926 422.909 C 2495.117 393.103, 2486.614 365.623, 2472.342 337 C 2459.187 310.615, 2447.473 294.133, 2424.428 269.579 C 2398.954 242.437, 2223.498 68.360, 2213 59.812 C 2185.524 37.440, 2152.287 19.885, 2118 9.635 C 2107.656 6.542, 2088.479 2.530, 2077.091 1.074 C 2065.863 -0.360, 2016.884 -0.085, 2005.444 1.477 M 2027.238 179.049 C 2014.324 181.351, 1998.752 188.366, 1988.604 196.453 C 1983.372 200.622, 1032.031 1147.672, 986.867 1193.671 L 976.235 1204.500 944.414 1398.213 C 926.912 1504.755, 912.805 1592.138, 913.064 1592.397 C 913.430 1592.763, 1281.620 1526.945, 1293.244 1524.436 C 1295.201 1524.014, 1439.680 1379.646, 1797.083 1020.989 C 2072.685 744.419, 2300.592 515.104, 2303.542 511.402 C 2316.536 495.096, 2322.789 474.830, 2321.716 452.500 C 2320.861 434.711, 2315.180 418.710, 2304.497 404 C 2298.336 395.517, 2104.483 201.664, 2096 195.503 C 2087.271 189.164, 2077.892 184.555, 2067.288 181.393 C 2060.224 179.287, 2055.950 178.708, 2045.500 178.442 C 2038.350 178.260, 2030.132 178.533, 2027.238 179.049 M 245 268.671 C 189.885 274.200, 142.461 293.137, 100.589 326.338 C 88.963 335.556, 69.157 355.084, 60.361 366 C 26.076 408.550, 5.968 457.850, 1.017 511.500 C -0.396 526.807, -0.392 2241.244, 1.020 2256.500 C 12.991 2385.784, 115.642 2488.017, 244.500 2498.989 C 253.914 2499.791, 496.680 2500.008, 1124.500 2499.776 C 1937.058 2499.476, 1992.147 2499.348, 2001.804 2497.745 C 2055.081 2488.899, 2097.998 2469.599, 2136.927 2436.980 C 2180.821 2400.199, 2213.092 2347.492, 2225.426 2292.437 C 2231.960 2263.274, 2231.424 2290.273, 2231.756 1973.500 C 2232.028 1713.186, 2231.907 1685.758, 2230.450 1678.516 C 2228.338 1668.015, 2224.018 1657.032, 2218.842 1649 C 2213.507 1640.722, 2197.170 1624.504, 2189.800 1620.169 C 2169.955 1608.498, 2148.938 1604.615, 2126.648 1608.502 C 2092.157 1614.517, 2063.899 1641.544, 2055.224 1676.814 C 2053.725 1682.910, 2053.530 1708.480, 2053.012 1966.500 C 2052.372 2285.369, 2053.301 2252.322, 2044.463 2270.653 C 2031.862 2296.789, 2006.847 2315.620, 1978.994 2319.937 C 1973.335 2320.815, 1760.937 2321.026, 1111.500 2320.800 L 251.500 2320.500 242.500 2317.684 C 213.487 2308.607, 191.393 2286.513, 182.316 2257.500 L 179.500 2248.500 179.242 1387.500 C 179.013 625.115, 179.155 525.579, 180.485 518.456 C 186.486 486.319, 211.588 459.224, 244.500 449.355 C 250.195 447.648, 264.893 447.526, 533.500 446.971 C 795.584 446.430, 817.008 446.261, 823.375 444.682 C 847.576 438.684, 868.276 423.360, 881.033 402 C 894.545 379.375, 896.790 347.434, 886.536 323.681 C 881.055 310.985, 877.049 305.091, 867 294.942 C 856.258 284.092, 847.911 278.286, 837 274.073 C 820.089 267.542, 842.902 267.984, 531.292 268.160 C 375.756 268.248, 246.925 268.478, 245 268.671'
                                                            stroke='none'
                                                            fill='currentColor'
                                                            fill-rule='evenodd'
                                                        ></path>
                                                    </svg>
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DraftModal;
