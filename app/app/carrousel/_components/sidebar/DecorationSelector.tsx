'use client';
import { TDecorationId } from '@/types/types';
import { decorationMap } from '../Decoration';
import { Button } from '@/components/ui/button';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';

type DecorationSelectorProps = {
    onSelect: (decoration: TDecorationId) => void;
    selectedDecoration: TDecorationId;
};
export function DecorationSelector({
    onSelect,
    selectedDecoration,
}: DecorationSelectorProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        toggleShowDecoration,
        carousel: {
            settings: { showDecoration },
        },
    } = useContext(CarouselContext);

    return (
        <>
            <ToggleableCollapsible
                label='Elementos Decorativos'
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
                    <DialogContent>
                        <div>
                            {Object.keys(decorationMap).map(
                                (decoration, index) => {
                                    return (
                                        // @ts-ignore
                                        <Button
                                            onClick={() => {
                                                onSelect(
                                                    decoration as TDecorationId
                                                );
                                                setIsDialogOpen(false);
                                            }}
                                            key={index}
                                        >
                                            {decoration}
                                        </Button>
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
