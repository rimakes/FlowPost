import { Session, getServerSession } from 'next-auth';
import { CarouselProvider } from '../_components/CarouselProvider';
import { CarouselSidebar } from '../_components/sidebar/Sidebar';
import { fakeCarousel } from '../_components/const';
import { CarouselWorkbench } from '../_components/CarouselWorkbench';
import Container from '@/components/shared/container';
import { Heading } from '@/components/shared/Heading';
import { TCarousel } from '@/types/types';
import { authOptions } from '@/auth';
import { getUserBrands } from '@/app/_actions/settings-actions';
import { getCarousel } from '@/app/_actions/carousel-actions';

/* TODO: Can we get a better aproach to stretch an element that is inside a flex container without making it this rigid? 
            Right now, it depends on the size of the scrollbar, which is not ideal...
            
            */
// const stretchClasses =
//     'relative w-[calc(100vw-1rem)] sm:w-[calc(100vw-1rem)] md:w-[calc(100vw-1rem)] lg:w-[calc(100vw-256px-1rem)]';

type props = {
    params: {
        carouselId: string;
    };
};

export default async function CarouselPage({ params }: props) {
    const session: Session | null = await getServerSession(authOptions);

    const userBrands = await getUserBrands(session?.user.id!);

    const { carouselId } = params;
    let carousel = fakeCarousel as TCarousel;

    console.log('userBrand1', userBrands[0]);

    if (carouselId === 'new') {
        carousel = {
            ...carousel,
            id: 'new',
        };
        if (userBrands.length > 0) {
            carousel = {
                ...carousel,
                settings: {
                    colorPalette: userBrands[0].colorPalette,
                    fontPalette: userBrands[0].fontPalette,
                    aspectRatio: 'PORTRAIT',
                    backgroundPattern: 'Bubbles',
                    showDecoration: true,
                },
                author: {
                    handle: userBrands[0].handle,
                    name: userBrands[0].name,
                    pictureUrl: userBrands[0].imageUrl,
                },
            } as TCarousel;
        }
    }

    // If the carousel is not new, we fetch it from the database
    if (!(carouselId === 'new')) {
        const dbCarousel = await getCarousel(carouselId);

        if (dbCarousel) {
            carousel = dbCarousel;
        }
    }

    return (
        <>
            <Container>
                <Heading
                    className='mt-6 border-0'
                    title='Genera un carrusel'
                    subtitle='Puedes generarlo de forma manual o pedirle a la IA que lo haga por ti a partir de un post'
                />
            </Container>

            <CarouselProvider initialCarousel={carousel}>
                <div
                    className={`border-re-500 flex w-full grow flex-col flex-wrap border-0 border-t md:flex-row`}
                >
                    <CarouselSidebar brands={userBrands} />
                    <CarouselWorkbench />
                </div>
            </CarouselProvider>
        </>
    );
}
