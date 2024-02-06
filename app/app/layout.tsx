'use client';

// import Sidebar from '@/components/ui/sidebar';
// import Header from '@/components/ui/header';

import Container from '@/components/shared/container';
import Header from '@/components/shared/header/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { stat } from 'fs';
import {
    BrainCog,
    CalendarCheck,
    Clock,
    Feather,
    GalleryHorizontal,
    GitPullRequest,
    HandIcon,
    Lightbulb,
    LucideIcon,
    PanelTopCloseIcon,
    Paperclip,
    Settings,
    SidebarClose,
    SidebarOpen,
    Sparkles,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden border-0 border-green-500'>
            <div className='relative flex flex-col flex-1 overflow-x-hidden border-0 border-blue-500'>
                <Header />
                <div className='flex flex-col-reverse lg:flex-row border-0 border-dotted border-red-500 min-h-[calc(100%-6rem)] h-full'>
                    <Sidebar />
                    {/* <main className='gap flex flex-1 flex-col py-12 [&>*:first-child]:scroll-mt-16'> */}
                    <main className='border-0 border-indigo-600 flex-1 overflow-auto flex flex-col'>
                        <div className='gap-2 bg-muted p-2 flex justify-center items-center text-sm'>
                            <Clock className='w-5 h-5 mr-2' />
                            Estás en un Free trial
                            <Button
                                variant={'default'}
                                size={'sm'}
                                className='rounded-full
                                text-xs
                                '
                            >
                                <Zap className='w-4 h-4 mr-2 fill-primary-foreground' />
                                Elige plan
                            </Button>
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);

    const collapse = () => {
        setCollapsed(true);
    };

    return (
        <div
            className={`sidebar border border-border
    lg:border-t-0
       flex gap-2 lg:flex-col lg:p-2 
sticky bottom-0 lg:z-2 bg-background border-r
border-t
isolate
transition-[width] duration-300
 ${collapsed ? 'lg:w-16' : 'lg:w-72'}`}
        >
            <Button
                className='absolute top-0 right-0 translate-x-full rounded-tl-none rounded-bl-none -z-10'
                size={'icon'}
                variant={'secondary'}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? (
                    <SidebarOpen className='w-5 h-5' />
                ) : (
                    <SidebarClose className='w-5 h-5' />
                )}
            </Button>
            <Button className='rounded-full gap-2 hidden lg:flex'>
                <Feather />
                {!collapsed && `Escribe tu post`}
            </Button>
            <div
                className={`${collapsed ? '' : '-right-2'} mb-auto flex lg:block border-0 border-pink-600
                lg:ml-0 lg:mr-0
                overflow-x-auto
                lg:overflow-x-hidden
                w-full
                relative
                `}
            >
                {MAIN_MENU_ITEMS.map((item) => (
                    <MenuItem
                        key={item.href}
                        {...item}
                        collapsed={collapsed}
                        collapse={collapse}
                    />
                ))}
            </div>
            <div className='hidden lg:block'>
                {SECONDAARY_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.href} {...item} collapsed={collapsed} />
                ))}
                <WordsUsedWidget collapsed={collapsed} />
            </div>
            {/* REVIEW: How to "stack to the right" in flex container*/}
            {/* LEARNING: Apparently, negative margins can only pull elements when that element is "anchored" from that side. AKA: in order to pull the element to the border of the parent, we need to do justify end (so it's anchored to the end) and THEN use a negative margin */}
            {/* <div className='border border-border p-2 flex justify-end'>
        <div className='h-20 border border-border border-r-8 w-full -mr-2'></div>
    </div> */}
        </div>
    );
};

type MenuItem = {
    icon: LucideIcon;
    label: string;
    shortLabel?: string;
    href: string;
    status: 'active' | 'próximamente' | 'nuevo';
    className?: string;
    collapsed?: boolean;
    collapse?: () => void;
};

export const MenuItem = ({
    href,
    icon: Icon,
    label,
    shortLabel,
    className,
    collapsed,
    collapse = () => {},
    status = 'active',
}: MenuItem) => {
    const pathname = usePathname();
    const classNameNotActive =
        status === 'próximamente'
            ? 'text-primary/40 border-primary/40 cursor-not-allowed'
            : '';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        onClick={collapse}
                        href={href}
                        className={cn(
                            `flex flex-1 p-3  flex-col  lg:flex-row gap-2 items-center h-fit
                            rounded-none
                            lg:w-full
                            lg:border-r-4
                            lg:border-t-0
                            border-t-4
                            border-transparent
                            lg:hover:bg-muted
            `,
                            className,
                            pathname === href
                                ? 'lg:border-r-4 border-primary bg-primary/5'
                                : '',
                            collapsed ? 'justify-center' : '',
                            status === 'próximamente'
                                ? 'cursor-not-allowed'
                                : ''
                        )}
                    >
                        <Icon
                            className={`w-5 h-5 shrink-0 ${classNameNotActive}`}
                        />
                        {!collapsed ? (
                            <span
                                className={`${classNameNotActive} hidden lg:inline truncate`}
                            >
                                {label}
                            </span>
                        ) : null}
                        <span className='lg:hidden'>
                            {shortLabel ? shortLabel : label}
                        </span>
                        {collapsed || status === 'active' ? null : (
                            <Badge
                                variant={`${
                                    status === 'próximamente'
                                        ? 'outline'
                                        : status === 'nuevo'
                                          ? 'new'
                                          : 'default'
                                }`}
                                className=' lg:static lg:opacity-100 opacity-60 absolute bottom-8

                                '
                            >
                                {capitalizeFirstLetter(status).slice(0, 5) +
                                    '.'}
                            </Badge>
                        )}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {status !== 'active'
                        ? 'Estamos desarrollando esta funcionalidad 🏗️'
                        : label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

type WordsUsedWidgetProps = {
    collapsed?: boolean;
};

export const WordsUsedWidget = ({ collapsed }: WordsUsedWidgetProps) => {
    return (
        <div
            className={`bg-primary/5 rounded-md space-y-2 border border-primary/10 ${collapsed ? 'px-0.5 text-[10px] font-normal' : 'text-xs p-2 font-semibold'}`}
        >
            <div className='flex justify-between'>
                {!collapsed && <p>Palabras usadas</p>}
                <p className=''>
                    0 <span>/ 1000</span>
                </p>
            </div>
            {!collapsed && (
                <>
                    <Progress
                        value={50}
                        max={100}
                        className='h-2 border border-primary/10 rounded-full'
                    />
                    <p className='opacity-75'>Estas usando un free trial</p>
                </>
            )}
        </div>
    );
};

const MAIN_MENU_ITEMS: MenuItem[] = [
    {
        icon: Sparkles,
        label: 'Post Generator',
        href: '/app/post-writter',
        shortLabel: 'Posts',
        status: 'active',
    },
    {
        icon: GalleryHorizontal,
        label: 'Crea un carrusel',
        href: '/app/carrousel',
        shortLabel: 'Carrusel',
        status: 'active',
    },
    {
        icon: Paperclip,
        label: 'Posts guardados',
        href: '/app/saved',
        shortLabel: 'Guardados',
        status: 'active',
    },
    {
        icon: Lightbulb,
        label: 'Ideas para post',
        href: '/app/ideas',
        shortLabel: 'Ideas',
        status: 'próximamente',
    },
    {
        icon: BrainCog,
        label: 'Inspiración',
        href: '/app/inspo',
        shortLabel: 'Inspo',
        status: 'próximamente',
    },
    {
        icon: CalendarCheck,
        label: 'Programa tus posts',
        href: '/app/schedule',
        shortLabel: 'Posts',
        status: 'próximamente',
    },
];

const SECONDAARY_MENU_ITEMS: MenuItem[] = [
    {
        icon: Settings,
        label: 'Ajustes',
        href: '/app/settings',
        shortLabel: 'Ajustes',
        status: 'active',
    },
    {
        icon: PanelTopCloseIcon,
        label: 'Pide herramientas',
        href: '/app/feature-request',
        shortLabel: 'Peticiones',
        status: 'active',
    },
];
// BOILER: Para roadmap, usar canny.io
