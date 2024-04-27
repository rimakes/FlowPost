import { AppModals } from '../../components/shared/AppModals';
import Feedback from '@/components/shared/feedback';
import Navbar from '@/components/shared/navbar/Navbar';
import { Sidebar } from '@/components/shared/sidebar/Sidebar';
import { ToolBanner } from '@/components/shared/ToolBanner';

export const maxDuration = 60; // This function can run for a maximum of 60 seconds

export default async function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden border-0 border-green-500'>
            <div className='relative flex flex-1 flex-col overflow-x-hidden'>
                <Navbar />
                <div className='flex h-full min-h-[calc(100%-6rem)] flex-col-reverse border-0 border-dotted border-red-500 lg:flex-row'>
                    <Sidebar />
                    <main className='flex flex-1 flex-col overflow-auto border-0 border-indigo-600 bg-background pb-4'>
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
