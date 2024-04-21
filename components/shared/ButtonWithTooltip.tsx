import { LucideIcon } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { Button, ButtonProps, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

type ButtonWithTooltipCustomProps = {
    label?: string;
    className?: string;
    icon: string | JSX.Element;
    onClick?: () => void;
    children?: React.ReactNode;
    buttonProps?: ComponentProps<typeof Button>;
    as?: React.ElementType;
    href?: string;
};

export const ButtonWithTooltipComponent = (
    {
        icon,
        className,
        label,
        onClick,
        children,
        buttonProps,
        as: Component = Button,
        href,
        ...props
    }: ButtonProps & ButtonWithTooltipCustomProps,
    ref: React.ForwardedRef<HTMLButtonElement>
) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <Component
                            ref={ref}
                            onClick={onClick}
                            href={href}
                            className={cn(
                                `${buttonVariants({
                                    variant: 'ghost',
                                })}`,
                                className
                            )}
                            {...props}
                            {...buttonProps}
                        >
                            {icon}
                        </Component>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {children}
        </>
    );
};

export const ButtonWithTooltip = forwardRef(ButtonWithTooltipComponent);
