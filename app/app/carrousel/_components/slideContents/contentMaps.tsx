import { BigNumberSlide } from './BigNumberSlide';
import { ImageAndTextHorizontal } from './ImageAndTextHorizontal';
import { ImageAndTextVertical } from './ImageAndTextVertical';
import { ListSlide } from './ListSlide';
import { TextOnlySlide } from './TextOnlySlide';
import { CallToActionSlide } from './CallToActionSlide';
import { CoverSlide } from './CoverSlide';

export const designMap = {
    ListSlide,
    BigNumberSlide,
    ImageAndTextHorizontal,
    ImageAndTextVertical,
    TextOnlySlide,
    CallToAction: CallToActionSlide,
    Cover: CoverSlide,
};

export const designNamesMap = {
    ListSlide: 'Lista',
    BigNumberSlide: 'Caracter Grande',
    ImageAndTextHorizontal: 'Imagen + Texto Hor.',
    ImageAndTextVertical: 'Imagen + Texto Ver.',
    TextOnlySlide: 'Solo Texto',
    CallToAction: 'Call To Action',
    Cover: 'Portada',
};

export const designNames = Object.keys(designMap);
