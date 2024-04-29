'use client';

import { Label } from '@radix-ui/react-label';
import { useContext } from 'react';
import {
    ArrowLeft,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronsUpDown,
    Plus,
    Trash2,
} from 'lucide-react';
import { CarouselContext } from './CarouselProvider';
import { designNamesMap } from './slideContents/contentMaps';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TSlide, TSlideDesignNames } from '@/types/types';
import { Slider } from '@/components/ui/slider';
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
        toggleSlideSetting: toggleSlideSetting,
        toggleSlideHasParagraph,
        setBackgroundImage,
        setDesign,
        editImage,
    } = useContext(CarouselContext);

    if (!isActive) return null;
    return (
        <div
            className={cn(
                `group relative flex flex-col gap-4 rounded-md rounded-tl-none rounded-tr-none border bg-background p-4`,
                className
            )}
        >
            <SlideActions />
            <Separator className='-mb-2 -mt-2' />
            <Button
                variant={'ghost'}
                className='absolute right-0 top-1/2 translate-x-[100%]'
                onClick={nextSlide}
            >
                <ArrowRightIcon />
            </Button>
            <Button
                variant={'ghost'}
                className='absolute left-0 top-1/2 -translate-x-[100%]'
                onClick={previousSlide}
            >
                <ArrowLeftIcon />
            </Button>

            <div className='flex items-center justify-between gap-2'>
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
            <Separator className='-mb-2 -mt-2' />
            <div>
                <Collapsible className=''>
                    <CollapsibleTrigger className=' flex w-full items-center justify-between'>
                        <Label htmlFor='paragraph'>Textos</Label>
                        <ChevronsUpDown size={20} className='ml-2' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Label htmlFor='paragraph' className='text-xs'>
                            Mostrar
                        </Label>
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
                        <div className='flex flex-wrap gap-2'></div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <Separator className='-mb-2 -mt-2' />

            <div>
                <Collapsible>
                    <CollapsibleTrigger className=' flex w-full items-center justify-between'>
                        <Label htmlFor='paragraph'>Imagen</Label>
                        <ChevronsUpDown size={20} className='ml-2' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ImageSelect onImageSelect={editImage} />
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <Separator className='-mb-2 -mt-2' />

            <div>
                <Collapsible>
                    <CollapsibleTrigger className=' flex w-full items-center justify-between'>
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
        <div className='flex w-full gap-2 text-xs'>
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
                className: 'flex items-center gap-2',
            })}
            style={{
                opacity: checked ? 1 : 0.5,
            }}
        >
            <Label
                htmlFor={id}
                className='flex h-full w-full items-center justify-center'
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
