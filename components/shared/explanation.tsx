import { TooltipArrow } from '@radix-ui/react-tooltip';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';

type ExplanationProps = {
    message: string;
    className?: string;
};

export function Explanation({ message, className }: ExplanationProps) {
    return (
        <span>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger className='-translate-y-1 translate-x-1/4 cursor-help text-xs font-bold text-pink-600'>
                        ?
                    </TooltipTrigger>
                    <TooltipContent>{message}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </span>
    );
}
