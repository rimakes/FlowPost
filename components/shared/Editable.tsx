import { cn } from '@/lib/utils';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

type Editable = {
    value: string;
    setValue: (value: any) => void;
    style?: CSSProperties;
    className?: string;
};
export function Editable({ value, setValue, style, className }: Editable) {
    const elementRef = useRef<any>();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (value) elementRef.current = value;
        setIsHydrated(true);
    }, [value]);

    return (
        <ContentEditable
            onChange={(event) => {
                elementRef.current = event.target.value;
                setValue(event.target.value);
            }}
            html={elementRef.current}
            className={cn(
                `focus:outline-none focus:ring-0 focus:border-transparent`,
                className
            )}
            style={style}
        />
    );
}
