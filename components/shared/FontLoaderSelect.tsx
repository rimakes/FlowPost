'use client';
// TODO: Not used for now. Not sure if I want to keep this one or the one with the filter...

import { useState } from 'react';
import { FONTS } from '@/config/fontsBigList';

type FontLoaderProps = {
    // value: string;
    // onChange: (value: string) => void;
};
export function FontLoader({}: FontLoaderProps) {
    const [font, setFont] = useState('Sofia');

    return (
        <>
            {/* do the same with a native select */}
            <select
                value={font}
                onChange={(e) => {
                    setFont(e.target.value);
                }}
            >
                {FONTS.map((font) => (
                    <option key={font} value={font}>
                        {font}
                    </option>
                ))}
            </select>

            <link
                rel='stylesheet'
                href={`https://fonts.googleapis.com/css?family=${font.replace(' ', '+')}`}
                crossOrigin='anonymous'
            />
        </>
    );
}

{
    /* <Select
                                value={font}
                                onValueChange={(value) => {
                                    setFont(value);
                                }}
                            >
                                <SelectTrigger>
                                    <span>{font}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {FONTS.map((font) => (
                                        <SelectItem key={font} value={font}>
                                            {font}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */
}
