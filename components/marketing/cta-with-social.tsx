import { cn } from '@/lib/utils';
import { GiftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { GetAccessButton } from './GetAccessButton';
import { ComponentProps } from 'react';

type CtaWithSocialProps = {
    accentText: string;
    primaryText: string;
    buttonLabel: string;
    spanClasses?: string;
    iconClasses?: string;
    buttonProps?: ComponentProps<typeof Button>;
};
export default function CtaWithSocial({
    accentText,
    primaryText,
    spanClasses,
    iconClasses,
    buttonProps,
}: CtaWithSocialProps) {
    return (
        <div className='flex flex-col gap-2 '>
            <GetAccessButton
                className='mb-1 mx-auto shadow-none text-primary
                            bg-gradient-to-tr  from-pink-400 to-indigo-500 text-pink-50 text-lg 
                            w-full
                            '
                buttonProps={buttonProps}
            />

            <div>
                <p className='flex items-center justify-center gap-2 text-sm'>
                    <GiftIcon className='animate-bounce text-teal-500' />
                    <span className='text-teal-500'>
                        {accentText}
                        &nbsp;
                        <span className={cn(`text-primary`, spanClasses)}>
                            {primaryText}
                        </span>
                    </span>
                </p>
            </div>
        </div>
    );
}
