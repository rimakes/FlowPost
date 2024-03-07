import { cn } from '@/lib/utils';
import { TBrand } from '@/types/types';
import { CSSProperties } from 'react';

type GradientBlobProps = {
    brand: TBrand;
    className?: string;
    style?: CSSProperties;
};

export const GradientBlob = ({
    brand,
    className,
    style,
}: GradientBlobProps) => {
    return (
        <div
            className={cn(
                `absolute rounded-full -bottom-[10%] -right-[20%] w-[15rem] h-[15rem] blur-2xl`,
                className
            )}
            style={{
                backgroundColor: brand.colorPalette.primary,
                opacity: 0.5,
                ...style,
            }}
        ></div>
    );
};
