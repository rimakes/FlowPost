'use client';

import { cn, wait } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface FormErrorProps extends VariantProps<typeof messageVariants> {
    className?: string;
    children?: React.ReactNode;
}

const messageVariants = cva(
    'rounded-md flex items-center gap-x-2 text-sm border p-3',
    {
        variants: {
            variant: {
                warning:
                    'bg-yellow-400/10 text-yellow-600 border-yellow-400/20 border-l-4 border-l-yellow-400/50',
                error: 'bg-destructive/10 text-destructive border-destructive/20 border-l-4 border-l-destructive/50',
                success:
                    'bg-success-background text-success-foreground border-success border-l-4 border-l-success',
                info: 'bg-info-background text-info-foreground border-info border-l-4 border-l-info',
            },
        },

        defaultVariants: {
            variant: 'warning',
        },
    }
);

export function Message({ children, className, variant }: FormErrorProps) {
    const [isShown, setIsShown] = useState(() => true);
    const divRef = useRef<HTMLDivElement>(null);

    if (!isShown) return null;

    const icon = (() => {
        switch (variant) {
            case 'error':
                return <AlertTriangle className='w-5 h-5 shrink-0' />;
            case 'success':
                return <CheckCircle className='w-5 h-5  shrink-0' />;
            case 'info':
                return <Info className='w-5 h-5  shrink-0' />;
            default:
                return <AlertTriangle className='w-5 h-5 shrink-0' />;
        }
    })();

    return (
        <div
            className={cn(
                messageVariants({ variant, className }),
                'relative transition-all duration-500 '
            )}
            ref={divRef}
        >
            <X
                className='absolute top-1 right-1 w-3 h-3 cursor-pointer'
                onClick={async () => {
                    divRef.current?.classList.add(
                        'opacity-0',
                        '-translate-y-10'
                    );
                    await wait(700);
                    setIsShown(false);
                }}
            />
            {icon}
            <p>{children}</p>
        </div>
    );
}
