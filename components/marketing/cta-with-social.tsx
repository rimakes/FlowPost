import { cn } from '@/lib/utils';
import { GiftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { GetAccessButton } from './GetAccessButton';

type CtaWithSocialProps = {
    accentText: string;
    primaryText: string;
    buttonLabel: string;
    buttonClasses?: string;
    spanClasses?: string;
    iconClasses?: string;
};
export default function CtaWithSocial({
    accentText,
    primaryText,
    spanClasses,
    iconClasses,
}: CtaWithSocialProps) {
    return (
        <div className='flex flex-col gap-2 '>
            <GetAccessButton />
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
