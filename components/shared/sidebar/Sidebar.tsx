'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, capitalizeFirstLetter, getCreditsByPriceId } from '@/lib/utils';
import {
    SidebarOpen,
    SidebarClose,
    Feather,
    LucideIcon,
    Sparkles,
    GalleryHorizontal,
    Paperclip,
    Lightbulb,
    BrainCog,
    CalendarCheck,
    Settings,
    PanelTopCloseIcon,
    MessageCircleHeart,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { CannyLink } from '../Canny';
import { appConfig } from '@/config/shipper.appconfig';
import { useSession } from 'next-auth/react';
import { TMenuItem } from '@/types/types';
import { MAIN_MENU_ITEMS, SECONDARY_MENU_ITEMS } from '@/config/const';

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const router = useRouter();

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
isolate z-10
transition-[width] duration-300
 ${collapsed ? 'lg:w-16' : 'lg:w-72'}`}
        >
            <Button
                className='absolute top-0 right-0 translate-x-full rounded-tl-none rounded-bl-none -z-10 border'
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
            <Button
                className='rounded-full gap-2 hidden lg:flex bg-indigo-50 border border-indigo-200 text-indigo-700'
                onClick={() => {
                    router.push('/app/post-writter/new');
                    setCollapsed(true);
                }}
            >
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
                {SECONDARY_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.href} {...item} collapsed={collapsed} />
                ))}
                <CannyLink className='flex gap-2'>
                    <MenuItem
                        key={'canny'}
                        icon={MessageCircleHeart}
                        label={'Sugerencias'}
                        href={`https://${appConfig.general.appName}.canny.io/peticiones`}
                        status={'active'}
                        collapsed={collapsed}
                        as={'div'}
                    />
                </CannyLink>
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

export const MenuItem = ({
    href,
    regex,
    icon: Icon,
    label,
    shortLabel,
    className,
    collapsed,
    collapse = () => {},
    status = 'active',
    as: Component = Link,
}: TMenuItem) => {
    const pathname = usePathname();
    const classNameNotActive =
        status === 'próximamente'
            ? 'text-primary/40 border-primary/40 cursor-not-allowed'
            : '';

    const MenuLink = ({}) => (
        <Component
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
                    ? 'lg:border-r-4 border-slate-300 bg-primary/5'
                    : '',
                regex && regex.test(pathname)
                    ? 'lg:border-r-4 border-slate-300 bg-primary/5'
                    : '',

                collapsed ? 'justify-center lg:border-r-0' : '',
                status === 'próximamente' ? 'cursor-not-allowed' : ''
            )}
        >
            <Icon className={`w-5 h-5 shrink-0 ${classNameNotActive}`} />
            {!collapsed ? (
                <span
                    className={`${classNameNotActive} hidden lg:inline truncate`}
                >
                    {label}
                </span>
            ) : null}
            <span className='lg:hidden'>{shortLabel ? shortLabel : label}</span>
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
                    {capitalizeFirstLetter(status).slice(0, 5) + '.'}
                </Badge>
            )}
        </Component>
    );

    if (!collapsed) return <MenuLink />;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='w-full'>
                    <MenuLink />
                </TooltipTrigger>
                <TooltipContent className='z-50'>
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
    const { data } = useSession();
    const creditBalance = data?.user?.creditBalance || 0;
    const isPro = !!data?.user?.stripeSubscription?.subscriptionId;
    const maxCredits = !isPro
        ? 3
        : getCreditsByPriceId(data?.user?.stripeSubscription?.priceId!);

    return (
        <div
            className={`bg-white rounded-md space-y-2 border border-primary/10 ${collapsed ? 'px-0.5 text-[10px] font-normal' : 'text-xs p-2 font-semibold'}`}
        >
            <div className='flex justify-between'>
                {!collapsed && <p>Créditos disponibles</p>}
                <p
                    className={`
                 text-center
                 ${collapsed ? 'mx-auto' : ''}
                `}
                >
                    {data?.user?.creditBalance ?? '...'}
                    <span> / {maxCredits}</span>
                </p>
            </div>
            {!collapsed && (
                <>
                    <Progress
                        value={(creditBalance / maxCredits) * 100}
                        className='h-2 border border-slate-100 rounded-full'
                        color='#FF0000'
                    />
                    {!isPro && (
                        <p className='opacity-75'>Estás usando un free trial</p>
                    )}
                </>
            )}
        </div>
    );
};
