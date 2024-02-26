import { cn } from '@/lib/utils';

type TextWithMediaProps = {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    children: React.ReactNode;
    side: 'left' | 'right';
    className?: string;
};
export function TextWithMedia({
    title,
    description,
    children,
    className,
    side,
}: TextWithMediaProps) {
    return (
        <div
            className={cn(
                `flex flex-col items-center justify-center gap-6 md:flex-row-reverse md:gap-9 md:even:flex-row md:even:text-right`,
                className,
                side === 'left' ? '' : ''
            )}
        >
            <div className='flex max-w-[400px] flex-col gap-5'>
                <h3 className='text-xl font-semibold text-primary'>{title}</h3>
                <p>{description}</p>
            </div>
            <div className='overflow-hidden rounded-lg'>{children}</div>
        </div>
    );
}
