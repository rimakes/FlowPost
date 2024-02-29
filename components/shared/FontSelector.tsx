'use client';

import { fontsMap } from '@/config/fonts';
import { TFontNames } from '@/types/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

type FontSelectorProps = {
    selectedFont: string;
    onSelect: (font: string) => void;
};
export function FontSelector({ selectedFont, onSelect }: FontSelectorProps) {
    // Get the keys of the object fontsMap
    // const fonts = Object.keys(fontsMap);
    // const [filteredFonts, setFilteredFonts] = useState(() =>
    //     Object.keys(fontsMap)
    // );

    const [query, setQuery] = useState('');

    const filteredFonts = Object.keys(fontsMap).filter((font) =>
        font.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className='flex flex-col gap-2 overflow-y-scroll max-h-48'>
            <Input
                className='sticky top-0'
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            {
                //    iterate on the object constFontsMap and get the key and value
                filteredFonts.map((font, index) => (
                    <Button
                        variant={'secondary'}
                        key={font}
                        // @ts-ignore
                        className={`${fontsMap[font].className} text-lg`}
                        onClick={() => onSelect(font)}
                    >
                        {font}
                    </Button>
                ))
            }
        </div>
    );
}
