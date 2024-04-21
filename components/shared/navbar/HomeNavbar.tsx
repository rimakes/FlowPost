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
import { LoginButton } from '@/components/auth/login-button';
import { menuItems } from '@/config/const';

export function HomeNavbar({ className }: { className?: string }) {
    const { data } = useSession();

    return (
        <header
            className={cn(
                `px-4 sm:px-6 lg:px-8 sticky top-0 bg-white border-b border-border z-30 py-4 shadow-indigo-50/50 shadow-xl`,
                className
            )}
        >
            <div className='flex items-center justify-between h-full -mb-px'>
                {/* Left side */}
                <Logo />
                <div className='lg:flex gap-2 items-center hidden '>
                    {menuItems.map((item) => {
                        return (
                            <Link
                                key={item.url}
                                href={item.url}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side */}
                <div className='lg:flex hidden items-center space-x-3'>
                    <LoginButton mode='modal'>
                        <Button variant={'outline'} className='bg-white'>
                            {data?.user?.id ? 'Ir a App' : 'Login'}
                        </Button>
                    </LoginButton>
                    {/* REVIEW: This wouldn't ve ever worked here since it's out of the provider  */}
                    {/* <DownloadButton /> */}

                    <Separator
                        orientation='vertical'
                        className='separator self-stretch h-auto'
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
                        {menuItems.map((item) => {
                            return (
                                <DropdownMenuItem key={item.url} asChild>
                                    <Link
                                        href={item.url}
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
