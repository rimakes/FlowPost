'use client';

import {
    SidebarOpen,
    SidebarClose,
    Feather,
    MessageCircleHeart,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CannyLink } from '../Canny';
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
import { appConfig } from '@/config/shipper.appconfig';
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
            className={`sidebar lg:z-2 sticky
    bottom-0
       isolate z-10 flex gap-2 
border border-r border-t border-border bg-background
transition-[width]
duration-300 lg:flex-col
lg:border-t-0 lg:p-2
 ${collapsed ? 'lg:w-16' : 'lg:w-72'}`}
        >
            <Button
                className='absolute right-0 top-0 -z-10 translate-x-full rounded-bl-none rounded-tl-none border'
                size={'icon'}
                variant={'secondary'}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? (
                    <SidebarOpen className='h-5 w-5' />
                ) : (
                    <SidebarClose className='h-5 w-5' />
                )}
            </Button>
            <Button
                className='hidden gap-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 lg:flex'
                onClick={() => {
                    router.push('/app/post-writter/new');
                    setCollapsed(true);
                }}
            >
                <Feather />
                {!collapsed && `Escribe tu post`}
            </Button>
            <div
                className={`${collapsed ? '' : '-right-2'} relative mb-auto flex w-full overflow-x-auto
                border-0 border-pink-600
                lg:ml-0
                lg:mr-0
                lg:block
                lg:overflow-x-hidden
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
                `flex h-fit flex-1  flex-col  items-center gap-2 rounded-none border-t-4
            border-transparent
            p-3
            lg:w-full
            lg:flex-row
            lg:border-r-4
            lg:border-t-0
            lg:hover:bg-muted
`,
                className,
                pathname === href
                    ? 'border-slate-300 bg-primary/5 lg:border-r-4'
                    : '',
                regex && regex.test(pathname)
                    ? 'border-slate-300 bg-primary/5 lg:border-r-4'
                    : '',

                collapsed ? 'justify-center lg:border-r-0' : '',
                status === 'próximamente' ? 'cursor-not-allowed' : ''
            )}
        >
            <Icon className={`h-5 w-5 shrink-0 ${classNameNotActive}`} />
            {!collapsed ? (
                <span
                    className={`${classNameNotActive} hidden truncate lg:inline`}
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
                    className=' absolute bottom-8 opacity-60 lg:static lg:opacity-100

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
            className={`space-y-2 rounded-md border border-primary/10 bg-white ${collapsed ? 'px-0.5 text-[10px] font-normal' : 'p-2 text-xs font-semibold'}`}
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
                        className='h-2 rounded-full border border-slate-100'
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
