// TODO: Not used

import { range } from '@mantine/hooks';
import { useContext } from 'react';
import { CarouselContext } from '../CarouselProvider';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContentSlideLayout } from '@/app/app/carrousel/_components/ContentSlideLayout';
import { TBrand } from '@/types/types';
import { TextOnlySlide } from '@/app/app/carrousel/_components/slideContents/TextOnlySlide';
import { useBrand } from '@/hooks/use-brand';

type TemplateSelectorProps = {};

export const TemplateSelector = ({}: TemplateSelectorProps) => {
    const { currentSlide, carousel, setCurrentSlideTo } =
        useContext(CarouselContext);
    const brand = useBrand() as TBrand;
    return (
        <Dialog>
            <DialogTrigger className='w-full' asChild>
                <Button className='w-full' variant={'secondary'}>
                    Elige plantilla
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[calc(100%-1rem)] md:max-w-[80vw]'>
                <div className='template-rows flex origin-left scale-[30%] flex-col items-start gap-2'>
                    {/* TODO: This will eventually be images instead */}
                    {range(1, 5).map((index) => {
                        return (
                            <div className='flex' key={index}>
                                {carousel.slides.map((slide, index) => (
                                    <ContentSlideLayout
                                        className=''
                                        key={index}
                                        brand={brand}
                                        currentSlide={currentSlide}
                                        numberOfSlides={carousel.slides.length}
                                        isActive={currentSlide === index}
                                        mode='light'
                                        onClick={() => setCurrentSlideTo(index)}
                                    >
                                        <TextOnlySlide
                                            slideNumber={1}
                                            title={
                                                carousel.slides[index].title!
                                                    .content
                                            }
                                            paragraphs={
                                                carousel.slides[
                                                    index
                                                ].paragraphs?.map(
                                                    (p) => p.content
                                                ) ?? []
                                            }
                                        />
                                    </ContentSlideLayout>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};
