import { LucideIcon } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

type ButtonWithTooltipCustomProps = {
    label?: string;
    className?: string;
    icon: string | JSX.Element;
    onClick?: () => void;
    children?: React.ReactNode;
};

export const ButtonWithTooltipComponent = (
    {
        icon,
        className,
        label,
        onClick,
        children,
        ...props
    }: ButtonProps & ButtonWithTooltipCustomProps,
    ref: React.ForwardedRef<HTMLButtonElement>
) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <Button
                            ref={ref}
                            onClick={onClick}
                            className={cn(``, className)}
                            {...props}
                        >
                            {icon}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {children}
        </>
    );
};

export const ButtonWithTooltip = forwardRef(ButtonWithTooltipComponent);
