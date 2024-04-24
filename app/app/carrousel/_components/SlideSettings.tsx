'use client';

import { Label } from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { CarouselContext } from './ContextProvider';
import {
    ArrowLeft,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronsUpDown,
    Plus,
    Trash2,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TSlide, TSlideDesignNames } from '@/types/types';
import { Slider } from '@/components/ui/slider';
import { designNamesMap } from './slideContents/contentMaps';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageSelect } from '@/components/shared/ImageSelect/ImageSelect';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

type SlideSettingsProps = {
    isActive?: boolean;
    className?: string;
    slide: TSlide;
};
export function SlideSettings({
    isActive = false,
    className,
    slide,
    ...slideProps
}: SlideSettingsProps) {
    const {
        nextSlide,
        previousSlide,
        toggleSlideContent: toggleSlideSetting,
        toggleSlideHasParagraph,
        setBackgroundImage,
        setDesign,
        editImage,
    } = useContext(CarouselContext);

    if (!isActive) return null;
    return (
        <div
            className={cn(
                `flex flex-col p-4 gap-4 border bg-background rounded-md rounded-tr-none rounded-tl-none relative group`,
                className
            )}
        >
            <SlideActions />
            <Separator />
            <Button
                variant={'ghost'}
                className='absolute top-1/2 right-0 translate-x-[100%]'
                onClick={nextSlide}
            >
                <ArrowRightIcon />
            </Button>
            <Button
                variant={'ghost'}
                className='absolute top-1/2 left-0 -translate-x-[100%]'
                onClick={previousSlide}
            >
                <ArrowLeftIcon />
            </Button>

            <div className='flex gap-2 items-center justify-between'>
                <Label htmlFor='slide-type' className='whitespace-nowrap'>
                    Tipo de slide
                </Label>
                <Select
                    value={slide.design!}
                    onValueChange={(value) => {
                        setDesign(value as TSlideDesignNames);
                    }}
                >
                    <SelectTrigger id='slide-type'>
                        <SelectValue placeholder='Selecciona' />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(designNamesMap).map((design, index) => {
                            return (
                                <SelectItem key={index} value={design}>
                                    {
                                        designNamesMap[
                                            design as TSlideDesignNames
                                        ].name
                                    }
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Collapsible className=''>
                    <CollapsibleTrigger className='flex justify-between w-full items-center mb-2'>
                        <Label htmlFor='paragraph'>Mostrar / Ocultar</Label>
                        <ChevronsUpDown size={20} className='ml-2' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='flex flex-wrap gap-2'>
                            <CheckLabel
                                id='Título'
                                checked={slide.title?.isShown!}
                                onCheckedChange={() => {
                                    toggleSlideSetting('title');
                                }}
                            />

                            <CheckLabel
                                id='Tagline'
                                checked={slide.tagline?.isShown!}
                                onCheckedChange={() => {
                                    toggleSlideSetting('tagline');
                                }}
                            />

                            <CheckLabel
                                id='Párrafos'
                                checked={slide.paragraphs[0]?.isShown!}
                                onCheckedChange={toggleSlideHasParagraph}
                            />

                            {/* <CheckLabel
                                id='LetraFondo'
                                checked={slide.paragraphs[1]?.isShown!}
                                onCheckedChange={toggleSlideHasParagraph}
                            /> */}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <div>
                <Collapsible>
                    <CollapsibleTrigger className='flex justify-between w-full items-center mb-2'>
                        <Label htmlFor='paragraph'>Imagen</Label>
                        <ChevronsUpDown size={20} className='ml-2' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ImageSelect onImageSelect={editImage} />
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <div>
                <Collapsible>
                    <CollapsibleTrigger className='flex justify-between w-full items-center mb-2'>
                        <Label htmlFor='paragraph'>Imagen de fondo</Label>
                        <ChevronsUpDown size={20} className='ml-2' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ImageSelect onImageSelect={setBackgroundImage} />
                        <div className='flex items-baseline gap-2'>
                            <Label htmlFor='opacity' className='mb-2'>
                                Opacidad
                            </Label>
                            <Slider
                                defaultValue={[slide.backgroundImage?.opacity!]}
                                value={[slide.backgroundImage?.opacity!]}
                                onValueChange={(value) => {
                                    setBackgroundImage(undefined, {
                                        opacity: value[0],
                                    });
                                }}
                                min={0}
                                max={1}
                                step={0.01}
                                id='opacity'
                            />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
}

export const SlideActions = () => {
    const {
        addSlideToRight,
        moveSlide,
        deleteCurrentSlide,
        currentSlide,
        carousel,
    } = useContext(CarouselContext);

    const isLastSlide = currentSlide === carousel.slides.length - 1;
    const isFirstSlide = currentSlide === 0;

    return (
        <div className='flex gap-2 text-xs w-full'>
            <Button
                disabled={isFirstSlide}
                variant={'secondary'}
                size={'sm'}
                className='mr-auto'
                onClick={() => moveSlide(-1)}
            >
                <ArrowLeft className='h-4 w-4' />
                Mover
            </Button>
            <Button
                variant={'secondary'}
                size={'sm'}
                className='flex gap-1'
                onClick={deleteCurrentSlide}
            >
                <Trash2 className='h-4 w-4' />
            </Button>
            <Button
                variant={'secondary'}
                size={'sm'}
                className='mr-auto'
                onClick={addSlideToRight}
            >
                <Plus className='h-4 w-4' />
            </Button>
            <Button
                disabled={isLastSlide}
                variant={'secondary'}
                size={'sm'}
                className=''
                onClick={() => moveSlide(1)}
            >
                Mover
                <ArrowRightIcon className='h-4 w-4' />
            </Button>
        </div>
    );
};

type CheckedLabelProps = {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export const CheckLabel = ({
    id,
    checked,
    onCheckedChange,
}: CheckedLabelProps) => {
    return (
        <div
            className={buttonVariants({
                variant: 'secondary',
                size: 'sm',
                className: 'flex gap-2 items-center',
            })}
            style={{
                opacity: checked ? 1 : 0.5,
            }}
        >
            <Label
                htmlFor={id}
                className='h-full w-full flex items-center justify-center'
            >
                {id}
            </Label>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                style={{
                    display: 'none',
                }}
            />
        </div>
    );
};
