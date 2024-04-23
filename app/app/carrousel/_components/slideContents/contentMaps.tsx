import { BigNumberSlide } from './BigNumberSlide';
import { ImageAndTextHorizontal } from './ImageAndTextHorizontal';
import { ImageAndTextVertical } from './ImageAndTextVertical';
import { ListSlide } from './ListSlide';
import { TextOnlySlide } from './TextOnlySlide';
import { CallToActionSlide } from './CallToActionSlide';
import { CoverSlide } from './CoverSlide';

export const designNamesMap = {
    ListSlide: { name: 'Lista', component: ListSlide },
    BigNumberSlide: { name: 'Carácter Grande', component: BigNumberSlide },
    ImageAndTextHorizontal: {
        name: 'Imagen + Texto Horiz.',
        component: ImageAndTextHorizontal,
    },
    ImageAndTextVertical: {
        name: 'Imagen + Texto Vert.',
        component: ImageAndTextVertical,
    },
    TextOnlySlide: { name: 'Solo Texto', component: TextOnlySlide },
    CallToAction: { name: 'Call To Action', component: CallToActionSlide },
    Cover: { name: 'Portada', component: CoverSlide },
};
