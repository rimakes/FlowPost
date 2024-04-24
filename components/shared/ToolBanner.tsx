import { getSubscription } from '@/app/_actions/other-actions';
import { cn } from '@/lib/utils';
import { Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

type ToolBannerProps = {
    className?: string;
};

export const ToolBanner = async ({ className }: ToolBannerProps) => {
    const subscription = await getSubscription();

    if (subscription) return null;

    return (
        <div
            className={cn(
                `gap-4 bg-indigo-50 p-2 flex justify-center items-center text-sm`,
                className
            )}
        >
            <div className='flex gap-2'>
                <Clock className='w-5 h-5 mr-2' />
                Estás en un Free trial
            </div>
            <Link
                href='/app/settings?tab=plan'
                className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                    'rounded-full text-xs'
                )}
            >
                <Zap className='w-4 h-4 mr-2 fill-primary-foreground' />
                Eligen Plan
            </Link>
        </div>
    );
};
