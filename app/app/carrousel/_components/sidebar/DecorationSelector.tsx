'use client';
import { TDecorationId } from '@/types/types';
import {
    SlideDecoration,
    decorationMap,
    decorationNamesMap,
} from '../slideParts/SlideDecoration';
import { Button } from '@/components/ui/button';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { CarouselContext } from '../CarouselProvider';
import { ColorPalette } from '@prisma/client';

type DecorationSelectorProps = {
    onSelect: (decoration: TDecorationId) => void;
    selectedDecoration: TDecorationId;
    colorPalette: ColorPalette;
};
export function DecorationSelector({
    onSelect,
    selectedDecoration,
    colorPalette,
}: DecorationSelectorProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        toggleCarouselSetting: toggleCarouselSetting,
        carousel: {
            settings: { showDecoration },
        },
    } = useContext(CarouselContext);
    const { font, background, primary, accent } = colorPalette;

    // TODO: This is a bit of a hack, but it works for now
    const notBackground = (design: string) => {
        if (
            [
                'VerticalGradient',
                'HorizontalGradient',
                'Prism',
                'Starts',
                'Paper',
            ].includes(design)
        )
            return true;
    };

    return (
        <>
            <ToggleableCollapsible
                label='Decoración Fondo'
                enabled={showDecoration}
                setEnabled={() => toggleCarouselSetting('showDecoration')}
            >
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant={'outline'}
                            className='w-full mt-2 flex justify-between'
                        >
                            {selectedDecoration}
                            <ChevronDown />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='overflow-y-scroll max-h-full'>
                        <div className='grid grid-cols-2 gap-2 gap-x-4 m-auto'>
                            {Object.keys(decorationMap).map(
                                (decoration, index) => {
                                    return (
                                        <div
                                            key={decoration}
                                            className='relative border-border px-4 py-4 w-40 aspect-square
                                            rounded-md overflow-hidden border cursor-pointer'
                                            style={{
                                                backgroundColor: notBackground(
                                                    decoration
                                                )
                                                    ? undefined
                                                    : background,
                                                color: font,
                                            }}
                                            onClick={() => {
                                                onSelect(
                                                    decoration as TDecorationId
                                                );
                                                setIsDialogOpen(false);
                                            }}
                                        >
                                            <SlideDecoration
                                                decorationid={
                                                    decoration as TDecorationId
                                                }
                                                fontColor={font}
                                                backgroundColor={background}
                                                accentColor={accent}
                                                primaryColor={primary}
                                                className='z-50'
                                            />
                                            <p
                                                className='absolute m-auto inset-0 text-lg font-semibold flex justify-center items-center text-center z-10
                                            '
                                                style={{
                                                    color: font,
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {decorationNamesMap[decoration]}
                                            </p>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </ToggleableCollapsible>
        </>
    );
}
