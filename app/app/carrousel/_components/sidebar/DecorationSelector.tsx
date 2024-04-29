'use client';
import { ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import { ColorPalette } from '@prisma/client';
import {
    SlideDecoration,
    decorationMap,
    decorationNamesMap,
} from '../slideParts/SlideDecoration';
import { CarouselContext } from '../CarouselProvider';
import { TDecorationId } from '@/types/types';
import { Button } from '@/components/ui/button';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
                // 'Paper',
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
                            className='mt-2 flex w-full justify-between'
                        >
                            {selectedDecoration}
                            <ChevronDown />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-h-full overflow-y-scroll'>
                        <div className='m-auto grid grid-cols-2 gap-2 gap-x-4'>
                            {Object.keys(decorationMap).map(
                                (decoration, index) => {
                                    return (
                                        <div
                                            key={decoration}
                                            className='relative aspect-square w-40 cursor-pointer overflow-hidden rounded-md
                                            border border-border px-4 py-4'
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
                                                className='absolute inset-0 z-10 m-auto flex items-center justify-center text-center text-lg font-semibold
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
