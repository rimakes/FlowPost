import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type ErrorWithResetProps = {
    reset: () => void;
    children?: React.ReactNode;
    className?: string;
};
export function ErrorWithReset({
    reset,
    children,
    className,
}: ErrorWithResetProps) {
    return (
        <div
            className={cn(
                `h-full flex flex-col justify-center items-center gap-8`,
                className
            )}
        >
            {children ?? (
                <div className='text-center'>
                    <h2 className='text-xl font-semibold text-primary mb-2'>
                        Ups! Algo ha ido mal!
                    </h2>
                    <p>Por favor, vuelva a intentarlo</p>
                </div>
            )}
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Volver a intentar
            </Button>
        </div>
    );
}
