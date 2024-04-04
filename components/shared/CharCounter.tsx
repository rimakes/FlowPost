import { cn } from '@/lib/utils';

type CharCounterProps = {
    usedChars: number;
    maxChars: number;
    minChars: number;
};
export function CharCounter({
    usedChars,
    maxChars,
    minChars,
}: CharCounterProps) {
    const charCounterClasses = cn(
        `absolute -bottom-5 right-0 text-xs text-yellow-700/50`,
        usedChars > Math.round(minChars * 3) && 'text-green-500',
        usedChars > maxChars && 'text-destructive'
    );

    const charCounter = `${usedChars} / ${maxChars}`;

    return <p className={charCounterClasses}>{charCounter}</p>;
}
