import { cn } from '@/lib/utils';

type CardHeaderProps = {
    title: string;
    subtitle?: string;
    className?: string;
};

export const Heading = ({ title, subtitle, className }: CardHeaderProps) => {
    return (
        <div className={cn(`mb-6`, className)}>
            <h1 className={`text-2xl text-primary font-bold `}>{title}</h1>
            <p className='hidden md:block text-muted-foreground'>{subtitle}</p>
        </div>
    );
};
