import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SettingsSectionHeaderProps = {
    title: string;
    subtitle: string;
    className?: string;
    children?: ReactNode;
};

export const SettingsSectionHeader = ({
    title,
    subtitle,
    className,
    children,
}: SettingsSectionHeaderProps) => {
    return (
        <div className='flex justify-between'>
            <div className={cn(``, className)}>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-sm text-primary/40'>{subtitle}</p>
            </div>
            {children}
        </div>
    );
};
