import { LucideIcon } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ButtonWithTooltipProps = {
    label?: string;
    className?: string;
    icon: LucideIcon;
    onClick?: () => void;
};

export const ButtonWithTooltip = ({
    icon: Icon,
    className,
    label,
    onClick,
}: ButtonWithTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={onClick}
                        className={cn(
                            `flex-1 rounded-full bg-muted text-primary/50
                        hover:bg-primary/10`,
                            className
                        )}
                    >
                        <Icon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
