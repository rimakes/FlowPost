'use client';
import { TDecorationId } from '@/types/types';
import { SlideDecoration, decorationMap } from '../slideParts/SlideDecoration';
import { Button } from '@/components/ui/button';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
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
        toggleShowDecoration,
        carousel: {
            settings: { showDecoration },
        },
    } = useContext(CarouselContext);
    const { font, background, primary, accent } = colorPalette;

    return (
        <>
            <ToggleableCollapsible
                label='Decoración Fondo'
                enabled={showDecoration}
                setEnabled={toggleShowDecoration}
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
                        <div className='grid grid-cols-2 gap-2 '>
                            {Object.keys(decorationMap).map(
                                (decoration, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='relative border-border px-4 py-4 text-[0.75em] w-40 aspect-square
                                            rounded-full overflow-hidden border boroder-border cursor-pointer'
                                            style={{
                                                backgroundColor: background,
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
                                            />
                                            <p className='absolute top-8 text-lg font-semibold'>
                                                {decoration}
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
