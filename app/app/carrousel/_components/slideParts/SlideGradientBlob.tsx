import { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { TBrand } from '@/types/types';

type SlideGradientBlobProps = {
    brand: TBrand;
    className?: string;
    style?: CSSProperties;
};

export const SlideGradientBlob = ({
    brand,
    className,
    style,
}: SlideGradientBlobProps) => {
    return (
        <div
            className={cn(
                `absolute -bottom-[10%] -right-[20%] h-[15rem] w-[15rem] rounded-full blur-2xl`,
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
