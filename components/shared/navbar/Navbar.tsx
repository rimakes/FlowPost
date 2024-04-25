'use client';

import { PenLine } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '../logo';
import { SelectAccountMenu } from './SelectAccountMenu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeadwayScript } from '@/widgets/headway';
import { cn } from '@/lib/utils';

export default function Navbar({ className }: { className?: string }) {
    const { data } = useSession();
    const router = useRouter();

    return (
        <header
            className={cn(
                `sticky top-0 z-30 border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8`,
                className
            )}
        >
            <div className='-mb-px flex h-full items-center justify-between'>
                {/* Left side */}
                <div className='flex items-center gap-2'>
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
                        className='separator h-auto self-stretch'
                    />

                    <SelectAccountMenu />
                </div>
            </div>
        </header>
    );
}
