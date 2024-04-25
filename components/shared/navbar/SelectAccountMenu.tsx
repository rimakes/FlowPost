'use client';
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
import { Button, buttonVariants } from '@/components/ui/button';
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
                <PopoverContent className='overflow-hidden p-0'>
                    <div className='flex flex-col'>
                        <div className='cur p-2'>
                            <div className='border-1 flex w-full justify-between border-red-500'>
                                <div className='flex items-center gap-4 border-0 border-indigo-500'>
                                    {/* REVIEW: I need to learn how to keep size ratios in these cases! */}
                                    {data?.user.image ? (
                                        <div className='relative h-10 w-10  shrink-0 overflow-hidden rounded-full'>
                                            <Image
                                                src={data?.user.image}
                                                alt='User'
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <User className='h-10 w-10 rounded-lg border border-primary/20 bg-primary/10' />
                                    )}
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>
                                            {data?.user.name || 'Cargando...'}
                                        </p>
                                        <p className='text-sm text-primary/40'>
                                            1 miembro
                                        </p>
                                    </div>
                                </div>

                                <Check className='h-5 w-5 self-center' />
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
                            <Settings className='h-5 w-5' />
                            Ajustes
                        </Button>

                        <Button
                            className='mt-0 gap-1 rounded-none
                p-2
                text-destructive
                hover:bg-destructive/10
                hover:text-destructive
                '
                            variant={'ghost'}
                            onClick={() => {
                                signOut({
                                    callbackUrl: '/?just-loggedout=true',
                                    // redirect: true,
                                });
                            }}
                        >
                            <PlusCircle className='h-5 w-5' />
                            Salir
                        </Button>
                        <Separator />
                        <CannyLink
                            className={`${buttonVariants({
                                variant: 'ghost',
                            })} gap-1 rounded-none`}
                        >
                            <MessageCircleHeart className='h-5 w-5' />
                            Sugerencias
                        </CannyLink>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};
