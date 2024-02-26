import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { range } from '@mantine/hooks';
import { useContext } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Slide } from '../Slide';

type TemplateSelectorProps = {};

export const TemplateSelector = ({}: TemplateSelectorProps) => {
    const { currentSlide, carousel, setCurrentSlideTo } =
        useContext(CarouselContext);
    return (
        <Dialog>
            <DialogTrigger className='w-full' asChild>
                <Button className='w-full' variant={'secondary'}>
                    Elige plantilla
                </Button>
            </DialogTrigger>
            <DialogContent className='md:max-w-[80vw] max-w-[calc(100%-1rem)]'>
                <div className='template-rows flex flex-col items-start gap-2 scale-[30%] origin-left'>
                    {/* TODO: This will eventually be images instead */}
                    {range(1, 5).map((index) => {
                        return (
                            <div className='flex' key={index}>
                                {carousel.slides.map((slide, index) => (
                                    <Slide
                                        className=''
                                        key={index}
                                        slide={slide}
                                        slideNumber={index}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};
