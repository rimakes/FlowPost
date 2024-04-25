import { Badge, Link } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Notification = {
    type: 'éxito' | 'error' | 'aviso' | 'info' | 'nuevo' | 'mejora';
    title: string;
    description: string;
    href: string;
};

type NotificationMenuProps = {
    notifications: Notification[];
};

export const NotificationMenu = ({}: NotificationMenuProps) => {
    return (
        <Popover>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild className='cursor-pointer'>
                            <div className='flex h-2 w-2 animate-pulse items-center justify-center rounded-full bg-primary' />
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Notificaciones</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className='p-0'>
                {FAKE_NOTIFICATIONS.map((notification) => (
                    <NotificationCard
                        notification={notification}
                        key={notification.description}
                    />
                ))}
            </PopoverContent>
        </Popover>
    );
};

export const NotificationCard = ({
    notification,
}: {
    notification: Notification;
}) => {
    const { type, title, description, href } = notification;
    const bagdeColor = {
        éxito: 'bg-green-100 border-green-600 text-green-600',
        error: 'bg-red-100 border-red-600 text-red-600',
        aviso: 'bg-yellow-100 border-yellow-600 text-yellow-600',
        info: 'bg-blue-200 border-blue-600 text-blue-600',
        nuevo: 'bg-indigo-200 border-indigo-600 text-indigo-600',
        mejora: 'bg-green-200 border-green-600 text-green-600',
    }[type];

    return (
        <>
            <div
                className='group flex cursor-pointer items-center
            gap-2
            p-2
            py-4
            hover:bg-primary/5
            '
            >
                <div className='text-xs'>
                    <Badge className={` ${bagdeColor} mr-2`}>
                        {notification.type}
                    </Badge>
                    <Link
                        href={notification.href}
                        className='mr-4 inline-block font-semibold group-hover:underline'
                    >
                        {title}
                    </Link>
                    <p className='inline text-primary/40'>{description}</p>
                </div>
            </div>
        </>
    );
};

const FAKE_NOTIFICATIONS: Notification[] = [
    {
        type: 'éxito',
        title: '¡Bienvenido!',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
    {
        type: 'error',
        title: 'Error al crear el post',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
    {
        type: 'aviso',
        title: '¡Bienvenido!',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
    {
        type: 'info',
        title: '¡Bienvenido!',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
    {
        type: 'nuevo',
        title: '¡Bienvenido!',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
    {
        type: 'mejora',
        title: '¡Bienvenido!',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
        href: '/',
    },
];
