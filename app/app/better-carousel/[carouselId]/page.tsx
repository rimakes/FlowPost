// TODO: Can we parametrize this? https://www.figma.com/file/wfLC0M1Ct6MyFlD6sub2cX/Carousel-Post-Templates-Pack-(Community)?type=design&node-id=1-268&mode=design&t=Vyuq14JJuPJNLHyC-0
// https://www.figma.com/file/2TevbCJQsHHge51w9GBz44/LinkedIn-Carousel-templates-(Community)?type=design&node-id=0-1&mode=design&t=JbZQ3CX6i9i8rvvt-0

import { auth } from '@/auth';
import { fakeCarousel } from '../../carrousel/_components/const';
import { TBrand, TCarousel, TColorPalette } from '@/types/types';
import { Heading } from '@/components/shared/Heading';
import Container from '@/components/shared/container';
import { getBrandsByUserId } from '@/app/_actions/shared-actions';
import { ColorPalette } from '../../carrousel/_components/sidebar/ColorPalette';
import { Avatar } from '../components/Avatar';
import { ProfileCard } from '../components/ProfileCard';
import { ReactNode } from 'react';
import { SlideFotter } from '../components/SlideFotter';
import { cn } from '@/lib/utils';
import { ProgressBar } from '../components/ProgressBar';
import { CallToActionSlide } from '../components/CallToActionSlide';
import { ListSlide } from '../components/slideContents/ListSlide';
import { BetterSlide } from '../components/BetterSlide';
import { ImageAndTextVertical } from '../components/slideContents/ImageAndTextVertical';
import { ImageAndTextHorizontal } from '../components/slideContents/ImageAndTextHorizontal';
import { CarouselContextProvider } from '../../carrousel/_components/ContextProvider';
import { CarouselWorkbench } from '../components/Workbench';
import { TextOnlySlide } from '../components/slideContents/TextOnlySlide';
import { SlideWithSettings } from '../../carrousel/_components/Workbench';
import { WorkbenchTest } from '../components/WorkbenchTest';

type props = {
    params: {
        carouselId: string;
    };
};

export default async function CarouselPage({ params }: props) {
    const session = await auth();
    const brands = await getBrandsByUserId(session?.user.id!);
    const brand = brands[0];

    const { carouselId } = params;

    let carousel = fakeCarousel as TCarousel;

    return (
        <>
            <Container>
                <Heading
                    className='mt-6 border-0'
                    title='Genera un carrusel'
                    subtitle='Puedes generarlo de forma manual o pedirle a la IA que lo haga por ti a partir de un post'
                />
            </Container>
            <div className='flex flex-col gap-2'>
                <div
                    className={`flex md:flex-row flex-col border-t flex-wrap w-full border-0 border-re-500 grow`}
                >
                    <div className='w-48 flex-col gap-2'>
                        <div className='flex gap-2'>
                            {Object.keys(brand.colorPalette).map(
                                (key, index) => {
                                    return <p key={index}>{key}</p>;
                                }
                            )}
                        </div>
                        <ColorPalette colors={brand.colorPalette} />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div
                        className='p-4'
                        style={{
                            backgroundColor: brand.colorPalette.background,
                        }}
                    >
                        <Avatar
                            imageUrl={brand.imageUrl}
                            mode='light'
                            colorPalette={brand.colorPalette}
                        />
                    </div>
                    <div
                        className='p-4'
                        style={{
                            backgroundColor: brand.colorPalette.font,
                        }}
                    >
                        <Avatar
                            imageUrl={brand.imageUrl}
                            mode='dark'
                            colorPalette={brand.colorPalette}
                        />
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Variant mode='light' colorPalette={brand.colorPalette}>
                        <ProfileCard
                            colorPalette={brand.colorPalette}
                            fontPalette={brand.fontPalette}
                            imageUrl={brand.imageUrl}
                            name={brand.name}
                            handle={brand.handle}
                        />
                    </Variant>
                    <Variant mode='dark' colorPalette={brand.colorPalette}>
                        <ProfileCard
                            colorPalette={brand.colorPalette}
                            fontPalette={brand.fontPalette}
                            imageUrl={brand.imageUrl}
                            name={brand.name}
                            handle={brand.handle}
                            mode='dark'
                            orientation='vertical'
                        />
                    </Variant>
                </div>

                <div className='flex gap-2'>
                    <Variant
                        mode='light'
                        colorPalette={brand.colorPalette}
                        className='w-[50%] relative'
                    >
                        <SlideFotter
                            colorPalette={brand.colorPalette}
                            fontPalette={brand.fontPalette}
                            imageUrl={brand.imageUrl}
                            name={brand.name}
                            handle={brand.handle}
                            mode='light'
                            swipeLabel={<div>Swipe</div>}
                        />
                    </Variant>
                    <Variant
                        mode='dark'
                        colorPalette={brand.colorPalette}
                        className='w-[50%] relative'
                    >
                        <SlideFotter
                            colorPalette={brand.colorPalette}
                            fontPalette={brand.fontPalette}
                            imageUrl={brand.imageUrl}
                            name={brand.name}
                            handle={brand.handle}
                            mode='dark'
                            swipeLabel={<div>Swipe</div>}
                        />
                    </Variant>
                </div>
                <div className='flex gap-2'>
                    <Variant
                        mode='light'
                        colorPalette={brand.colorPalette}
                        className='w-[50%] relative'
                    >
                        <ProgressBar
                            colorPalette={brand.colorPalette}
                            currentSlide={1}
                            numberOfSlides={6}
                            mode='light'
                        />
                    </Variant>
                    <Variant
                        mode='dark'
                        colorPalette={brand.colorPalette}
                        className='w-[50%] relative'
                    >
                        <ProgressBar
                            colorPalette={brand.colorPalette}
                            currentSlide={1}
                            numberOfSlides={6}
                            mode='dark'
                        />
                    </Variant>
                </div>
            </div>
            <div className='flex justify-start'>
                {/* <CarouselContextProvider initialCarousel={carousel}>
                    <BetterSlide
                        brand={brand}
                        isActive={false}
                        setIsActive={() => {}}
                        mode='light'
                    >
                        <ImageAndTextHorizontal
                            brand={brand}
                            imageUrl='https://images.pexels.com/photos/20432992/pexels-photo-20432992/free-photo-of-funchal-at-madeira.jpeg'
                            title='This is a title here'
                            description='lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                        />
                    </BetterSlide>
                </CarouselContextProvider>
                <CallToActionSlide
                    brand={brand}
                    title='¿Y tú que opinas?'
                    subtitle='Si te gustó el contenido, tengo mucho más!'
                    callToActionText='Sígueme para más contenido'
                    mode='dark'
                /> */}
                <CarouselContextProvider initialCarousel={carousel}>
                    <WorkbenchTest />
                </CarouselContextProvider>
                {/* <CarouselWorkbench brand={brand} /> */}
            </div>
        </>
    );
}

type VariantProps = {
    mode: 'light' | 'dark';
    colorPalette: TColorPalette;
    children: ReactNode;
    className?: string;
};

const Variant = ({
    children,
    mode = 'light',
    colorPalette,
    className = '',
}: VariantProps) => {
    return (
        <div
            className={cn(`p-4`, className)}
            style={{
                backgroundColor:
                    mode === 'light'
                        ? colorPalette.background
                        : colorPalette.font,
            }}
        >
            {children}
        </div>
    );
};
