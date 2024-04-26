'use Client';

import { Menu } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { Button, buttonVariants } from '@ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { LoginButton } from '@/components/auth/LoginButton';
import { GetAccessButton } from '@/components/marketing/GetAccessButton';
import { MENU_ITEMS } from '@/config/const';
import { Separator } from '@ui/separator';

type TestComponentProps = {};
export function TestComponent(props: TestComponentProps) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='' asChild>
                    <Button variant={'ghost'}>
                        HERE <Menu size={24} />
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
                                    {item.label}HERE
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
    );
}
