'use client';

import { useId, useState } from 'react';
import { ArrowDownIcon, ChevronDown } from 'lucide-react';
import { useDebouncedState } from '@mantine/hooks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { TFontName } from '@/types/types';
import { FONTS } from '@/config/fontsBigList';

type FontSelectorProps = {
    setFontPalette: (font: TFontName) => void;
    font: TFontName;
};
export const FontSelector = ({ font, setFontPalette }: FontSelectorProps) => {
    const [fontPopOverisOpen, setFontPopOverisOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useDebouncedState(query, 700);
    const [numberOfFonts, setNumberOfFonts] = useState(10);
    const id = useId();

    const filteredFonts = FONTS.filter((font) =>
        font.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).slice(0, numberOfFonts);

    const onSetFontPalette = async (font: TFontName) => {
        setFontPalette(font);
        setFontPopOverisOpen(false);
    };

    return (
        <>
            <Popover
                open={fontPopOverisOpen}
                onOpenChange={setFontPopOverisOpen}
            >
                <PopoverTrigger className='flex w-full items-center justify-between'>
                    <div
                        className={`flex w-full items-center justify-between gap-2 rounded-md border border-border p-1 px-2`}
                        style={{ fontFamily: font }}
                    >
                        {font}
                        <ChevronDown className='h-4 w-4' />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <>
                        <div className='flex max-h-48 flex-col gap-2 overflow-y-scroll'>
                            <Input
                                className='sticky top-0'
                                defaultValue={debouncedQuery}
                                onChange={(e) => {
                                    setDebouncedQuery(e.target.value);
                                }}
                                placeholder='Busca tu fuente'
                            />
                            {
                                //    iterate on the object constFontsMap and get the key and value
                                filteredFonts.map((font, index) => (
                                    <Button
                                        variant={'secondary'}
                                        style={{ fontFamily: font }}
                                        key={font}
                                        // @ts-ignore
                                        // className={`${fontsMap[font].className} text-lg`}
                                        onClick={() =>
                                            onSetFontPalette(font as TFontName)
                                        }
                                    >
                                        {font}
                                    </Button>
                                ))
                            }
                            <Button
                                className='gap-2'
                                variant={'outline'}
                                onClick={() => {
                                    setNumberOfFonts(numberOfFonts + 10);
                                }}
                            >
                                Cargar más <ArrowDownIcon className='h-4 w-4' />
                            </Button>
                        </div>
                    </>
                </PopoverContent>
            </Popover>
            {filteredFonts.map((font) => (
                <link
                    key={font}
                    rel='stylesheet'
                    href={`https://fonts.googleapis.com/css?family=${font.replace(
                        ' ',
                        '+'
                    )}:400,700`}
                />
            ))}
        </>
    );
};
