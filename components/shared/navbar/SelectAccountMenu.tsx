'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    User,
    Check,
    PlusCircle,
    Settings,
    MessageCircleHeart,
    ChevronsUpDown,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CannyLink } from '../Canny';
import { Separator } from '@/components/ui/separator';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export const SelectAccountMenu = () => {
    const { data } = useSession();
    const router = useRouter();

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'secondary'} className='gap-1'>
                        <span className='hidden sm:inline'>
                            {data?.user.name || 'Cargando...'}
                        </span>
                        <span className='sm:hidden'>
                            {`${data?.user.name?.slice(0, 3)}.` || '...'}
                        </span>
                        <ChevronsUpDown className='h-4 w-4' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0 overflow-hidden'>
                    <div className='flex flex-col'>
                        <div className='p-2 cur'>
                            <div className='flex justify-between w-full border-1 border-red-500'>
                                <div className='flex items-center gap-4 border-0 border-indigo-500'>
                                    {/* REVIEW: I need to learn how to keep size ratios in these cases! */}
                                    {data?.user.image ? (
                                        <div className='relative h-10 w-10  shrink-0 rounded-full overflow-hidden'>
                                            <Image
                                                src={data?.user.image}
                                                alt='User'
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <User className='w-10 h-10 bg-primary/10 rounded-lg border border-primary/20' />
                                    )}
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>
                                            {data?.user.name || 'Cargando...'}
                                        </p>
                                        <p className='text-primary/40 text-sm'>
                                            1 miembro
                                        </p>
                                    </div>
                                </div>

                                <Check className='w-5 h-5 self-center' />
                            </div>
                        </div>
                        {/* <Button
                    className='border-t border-border p-2 mt-0 rounded-none'
                    variant={'ghost'}
                >
                    <PlusCircle className='w-5 h-5' />
                    Añade otra cuenta
                </Button> */}

                        <Button
                            onClick={() => {
                                router.push('/app/settings');
                            }}
                            variant={'ghost'}
                            className='gap-1 rounded-none'
                        >
                            <Settings className='w-5 h-5' />
                            Ajustes
                        </Button>

                        <Button
                            className='p-2 mt-0 rounded-none
                text-destructive
                hover:bg-destructive/10
                hover:text-destructive
                gap-1
                '
                            variant={'ghost'}
                            onClick={() => {
                                signOut({
                                    callbackUrl: '/?just-loggedout=true',
                                    // redirect: true,
                                });
                            }}
                        >
                            <PlusCircle className='w-5 h-5' />
                            Salir
                        </Button>
                        <Separator />
                        <CannyLink
                            className={`${buttonVariants({
                                variant: 'ghost',
                            })} gap-1 rounded-none`}
                        >
                            <MessageCircleHeart className='w-5 h-5' />
                            Sugerencias
                        </CannyLink>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};
