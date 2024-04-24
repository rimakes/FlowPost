'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useId, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { TFontName } from '@/types/types';
import { ArrowDownIcon, ChevronDown } from 'lucide-react';
import { FONTS } from '@/config/fontsBigList';
import { useDebouncedState } from '@mantine/hooks';

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
                <PopoverTrigger className='w-full flex items-center justify-between'>
                    <div
                        className={`flex w-full items-center gap-2 justify-between border border-border p-1 px-2 rounded-md`}
                        style={{ fontFamily: font }}
                    >
                        {font}
                        <ChevronDown className='w-4 h-4' />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <>
                        <div className='flex flex-col gap-2 overflow-y-scroll max-h-48'>
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
                                Cargar más <ArrowDownIcon className='w-4 h-4' />
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
