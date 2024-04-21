'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeadwayScript } from '@/scripts/headway';
import { PenLine } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Logo from '../logo';
import { SelectAccountMenu } from './SelectAccountMenu';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function Navbar({ className }: { className?: string }) {
    const { data } = useSession();
    const router = useRouter();

    return (
        <header
            className={cn(
                `px-4 sm:px-6 lg:px-8 sticky top-0 border-b border-border z-30 py-4 bg-background`,
                className
            )}
        >
            <div className='flex items-center justify-between h-full -mb-px'>
                {/* Left side */}
                <div className='flex gap-2 items-center'>
                    <Logo linkUrl='/app' />
                    <HeadwayScript />
                </div>

                {/* Right side */}
                <div className='flex items-center space-x-3'>
                    <Button
                        onClick={() => {
                            router.push('/app/post-writter/new');
                        }}
                    >
                        <PenLine className='mr-2' />
                        <span className='hidden sm:inline'>Escribir Post</span>
                    </Button>
                    {/* REVIEW: This wouldn't ve ever worked here since it's out of the provider  */}
                    {/* <DownloadButton /> */}

                    <Separator
                        orientation='vertical'
                        className='separator self-stretch h-auto'
                    />

                    <SelectAccountMenu />
                </div>
            </div>
        </header>
    );
}
