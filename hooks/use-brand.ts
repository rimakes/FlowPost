import { CarouselContext } from '@/app/app/carrousel/_components/CarouselProvider';
import { TBrand } from '@/types/types';
import { useContext } from 'react';

export const useBrand = () => {
    const provider = useContext(CarouselContext);

    const { carousel } = provider;
    // If not context, throw an error
    if (!provider) {
        throw new Error('useBrand must be used within a CarouselProvider');
    }

    const brand: Omit<TBrand, 'id' | 'authorId'> = {
        colorPalette: carousel.settings.colorPalette,
        fontPalette: carousel.settings.fontPalette,
        imageUrl: carousel.author.pictureUrl,
        name: carousel.author.name,
        handle: carousel.author.handle,
    };

    return brand;
};
