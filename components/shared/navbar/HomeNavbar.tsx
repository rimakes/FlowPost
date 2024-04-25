'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Logo from '../logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GetAccessButton } from '@/components/marketing/GetAccessButton';
import { LoginButton } from '@/components/auth/LoginButton';
import { MENU_ITEMS } from '@/config/const';
import { Route } from 'next';

export function HomeNavbar({ className }: { className?: string }) {
    const { data } = useSession();

    return (
        <header
            className={cn(
                `sticky top-0 z-30 border-b border-border bg-white px-4 py-4 shadow-xl shadow-indigo-50/50 sm:px-6 lg:px-8`,
                className
            )}
        >
            <div className='-mb-px flex h-full items-center justify-between'>
                {/* Left side */}
                <Logo />
                <div className='hidden items-center gap-2 lg:flex '>
                    {MENU_ITEMS.map((item) => {
                        return (
                            <Link
                                key={item.url}
                                href={item.url as Route}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side */}
                <div className='hidden items-center space-x-3 lg:flex'>
                    <LoginButton mode='modal'>
                        <Button variant={'outline'} className='bg-white'>
                            {data?.user?.id ? 'Ir a App' : 'Login'}
                        </Button>
                    </LoginButton>
                    {/* REVIEW: This wouldn't ve ever worked here since it's out of the provider  */}
                    {/* <DownloadButton /> */}

                    <Separator
                        orientation='vertical'
                        className='separator h-auto self-stretch'
                    />
                    <GetAccessButton
                        className=' shadow-none'
                        buttonProps={{
                            variant: 'secondary',
                        }}
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className='lg:hidden' asChild>
                        <Button variant={'ghost'}>
                            <Menu size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='flex flex-col gap-2 p-2'>
                        {MENU_ITEMS.map((item) => {
                            return (
                                <DropdownMenuItem key={item.url} asChild>
                                    <Link
                                        href={item.url as Route}
                                        className={buttonVariants({
                                            variant: 'link',
                                        })}
                                    >
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                        <Separator />
                        <DropdownMenuItem className='w-full' asChild>
                            {/* <Button variant={'secondary'}> */}
                            <LoginButton mode='modal'>
                                <Button variant={'outline'}>Login</Button>
                            </LoginButton>
                            {/* </Button> */}
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <GetAccessButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
