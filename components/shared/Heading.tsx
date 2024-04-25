import { cn } from '@/lib/utils';

type CardHeaderProps = {
    title: string;
    subtitle?: string;
    className?: string;
};

export const Heading = ({ title, subtitle, className }: CardHeaderProps) => {
    return (
        <div className={cn(`mb-6`, className)}>
            <h1 className={`text-2xl font-bold text-primary `}>{title}</h1>
            <p className='hidden text-muted-foreground md:block'>{subtitle}</p>
        </div>
    );
};
