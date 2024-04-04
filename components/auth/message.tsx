import { cn, wait } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
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
                    'bg-emerald-400/10 text-emerald-400 border-emerald-400/20 border-l-4 border-l-emerald-400/50',
            },
        },

        defaultVariants: {
            variant: 'warning',
        },
    }
);

export function Message({ children, className, variant }: FormErrorProps) {
    const [isShown, setIsShown] = useState(true);
    const divRef = useRef<HTMLDivElement>(null);

    if (!children) return null;

    if (!isShown) return null;

    const icon = (() => {
        switch (variant) {
            case 'error':
                return <AlertTriangle className='w-5 h-5 shrink-0' />;
            case 'success':
                return <CheckCircle className='w-5 h-5  shrink-0' />;
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
                className='absolute top-2 right-2 w-4 h-4 cursor-pointer'
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
