'use client';

import { Button } from '@/components/ui/button';
import { useAppProvider } from '@/providers/app-provider';
import { ChevronsUpDown, PenLine } from 'lucide-react';
import { useState } from 'react';
import Logo from '../logo';
import { Separator } from '@/components/ui/separator';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { HeadwayScript } from '@/scripts/headway';
import { SelectAccountMenu } from './SelectAccountMenu';

export default function Header() {
    const { sidebarOpen, setSidebarOpen } = useAppProvider();
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

    return (
        // BOILER: Change this in boilerplate
        <header className=' px-4 sm:px-6 lg:px-8 sticky top-0 bg-background border-b border-border z-30 h-24'>
            <div className='flex items-center justify-between h-full -mb-px'>
                {/* Left side */}
                <div className='flex gap-2 items-center'>
                    <Logo />
                    <HeadwayScript />
                </div>

                {/* Right side */}
                <div className='flex items-center space-x-3'>
                    <Button>
                        <PenLine className='mr-2' />
                        Escribir Post
                    </Button>

                    <Separator
                        orientation='vertical'
                        className='separator self-stretch h-auto'
                    />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'secondary'}>
                                [Nombre]
                                <ChevronsUpDown className='ml-2 h-4 w-4' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='p-0'>
                            <SelectAccountMenu />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
