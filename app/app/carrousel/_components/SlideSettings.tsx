'use client';

import { Label } from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import { useContext, useState } from 'react';
import { CarouselContext } from './ContextProvider';
import {
    ArrowLeft,
    ArrowLeftIcon,
    ArrowRightIcon,
    Plus,
    Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TSlide, TSlideDesignNames, TStatus } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { getPexelImages } from '@/app/_actions/writter-actions';
import Image from 'next/image';
import { toast } from 'sonner';
import { designMap, designNamesMap } from './slideContents/contentMaps';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageSearch } from '@/components/shared/ImageSearch';

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
        editTitle,
        editTagline,
        editDescription,
        nextSlide,
        previousSlide,
        toggleSlideHasTitle,
        toggleSlideHasParagraph,
        toggleSlideHasTagline,
        carousel,
        toggleShowSwipeLabel,
        setBackgroundImage,
        getCompleteBrand,
        setDesign,
        editImage,
    } = useContext(CarouselContext);
    const [backgroundImagequery, setbackgroundImageQuery] =
        useState<string>('');
    const [status, setStatus] = useState<TStatus>('idle');

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
                className='absolute top-1/2 right-0 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={nextSlide}
            >
                <ArrowRightIcon />
            </Button>
            <Button
                variant={'ghost'}
                className='absolute top-1/2 left-0 -translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={previousSlide}
            >
                <ArrowLeftIcon />
            </Button>

            <Label htmlFor='slide-type'>Tipo de slide</Label>
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
                    {Object.keys(designMap).map((design, index) => {
                        return (
                            <SelectItem key={index} value={design}>
                                {/* @ts-ignore */}
                                {designNamesMap[design]}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            <Separator />
            <Label htmlFor='paragraph'>Textos</Label>
            <div className='flex flex-wrap gap-2'>
                <div className='flex flex-col items-center'>
                    Título
                    <Checkbox
                        checked={slide.title?.isShown!}
                        onCheckedChange={toggleSlideHasTitle}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    Tagline
                    <Checkbox
                        checked={slide.tagline?.isShown!}
                        onCheckedChange={toggleSlideHasTagline}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    Párrafos
                    <Checkbox
                        checked={slide.paragraphs[0]?.isShown!}
                        onCheckedChange={toggleSlideHasParagraph}
                    />
                </div>
            </div>
            <div className='flex gap-2'></div>
            <Separator />
            <ImageSearch getImages={getPexelImages} onImageSelect={editImage} />
            <ImageSearch
                getImages={getPexelImages}
                onImageSelect={setBackgroundImage}
            />
            <Label htmlFor='opacity'>Opacidad</Label>
            <Slider
                defaultValue={[slide.backgroundImage?.opacity!]}
                value={[slide.backgroundImage?.opacity!]}
                onValueChange={(value) => {
                    setBackgroundImage(undefined, { opacity: value[0] });
                }}
                min={0}
                max={1}
                step={0.01}
                id='opacity'
            />
        </div>
    );
}

export const SlideActions = () => {
    const {
        addSlideToRight,
        moveCurrentSlideToLeft,
        moveCurrentSlideToRight,
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
                onClick={moveCurrentSlideToLeft}
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
                onClick={moveCurrentSlideToRight}
            >
                Mover
                <ArrowRightIcon />
            </Button>
        </div>
    );
};
