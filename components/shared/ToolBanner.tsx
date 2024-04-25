import { Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { getSubscription } from '@/app/_actions/user-actions';
import { getServerSession } from '@/auth';

type ToolBannerProps = {
    className?: string;
};

export const ToolBanner = async ({ className }: ToolBannerProps) => {
    const session = await getServerSession();
    const subscription = await getSubscription(session?.user!.id!);

    if (subscription) return null;

    return (
        <div
            className={cn(
                `flex items-center justify-center gap-4 bg-indigo-50 p-2 text-sm`,
                className
            )}
        >
            <div className='flex gap-2'>
                <Clock className='mr-2 h-5 w-5' />
                Estás en un Free trial
            </div>
            <Link
                href='/app/settings?tab=plan'
                className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                    'rounded-full text-xs'
                )}
            >
                <Zap className='mr-2 h-4 w-4 fill-primary-foreground' />
                Eligen Plan
            </Link>
        </div>
    );
};
