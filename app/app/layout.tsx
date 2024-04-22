import Feedback from '@/components/shared/feedback';
import Navbar from '@/components/shared/navbar/Navbar';
import { Sidebar } from '@/components/shared/sidebar/Sidebar';
import { AppModals } from '../_components/AppModals';
import { ToolBanner } from '@/components/shared/ToolBanner';

export const maxDuration = 60; // This function can run for a maximum of 60 seconds

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden border-0 border-green-500'>
            <div className='relative flex flex-col flex-1 overflow-x-hidden'>
                <Navbar />
                <div className='flex flex-col-reverse lg:flex-row border-0 border-dotted border-red-500 min-h-[calc(100%-6rem)] h-full'>
                    <Sidebar />
                    <main className='border-0 border-indigo-600 flex-1 overflow-auto flex flex-col bg-background pb-4'>
                        <ToolBanner className='hidden md:flex' />
                        <Feedback />
                        {children}
                    </main>
                </div>
            </div>
            <AppModals />
        </div>
    );
}
