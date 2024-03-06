import { z } from 'zod';
import { BigNumber } from './slideContents/BigNumberSlide';
import { ImageAndTextHorizontal } from './slideContents/ImageAndTextHorizontal';
import { ImageAndTextVertical } from './slideContents/ImageAndTextVertical';
import { ListSlide } from './slideContents/ListSlide';
import { TextOnlySlide } from './slideContents/TextOnlySlide';
import { TBrand, TSlideDesignNames } from '@/types/types';
import {
    aspectRatioClasses,
    AspectRatioKeys,
    ContentSlideLayout,
} from './ContentSlideLayout';
import { ASPECT_RATIOS_MAP } from './const';

type SlideDesignSelectorProps = {
    currentDesignId: string;
    setCurrentDesign: (design: TSlideDesignNames) => void;
    brand: TBrand;
};

export function SlideDesignSelector({
    currentDesignId,
    setCurrentDesign,
    brand,
}: SlideDesignSelectorProps) {
    const DesignElement = designMap[currentDesignId as TSlideDesignNames];

    return (
        <div className='flex scale-50 -translate-x-[25%]'>
            {Object.keys(designMap).map((key) => {
                const DesignElement = designMap[key as TSlideDesignNames];
                return (
                    <ContentSlideLayout
                        key={1}
                        brand={brand}
                        mode='light'
                        currentSlide={1}
                        numberOfSlides={1}
                        onClick={() =>
                            setCurrentDesign(key as TSlideDesignNames)
                        }
                        isActive={true}
                        className='relative'
                    >
                        <DesignElement
                            brand={brand}
                            description='Slide Content'
                            imageUrl=''
                            paragraphs={['item 1', 'item 2', 'item 3']}
                            number={'1'}
                            title='Slide Title'
                            imageFirst={true}
                            imageLocation='left'
                            subtitle='Slide Content'
                        />
                    </ContentSlideLayout>
                );
            })}
        </div>
    );
}

export const designMap = {
    BigNumber,
    ImageAndTextHorizontal,
    ImageAndTextVertical,
    ListSlide,
    TextOnlySlide,
};

// TODO: schemas for chatgpt
export const designSchemasMap = {
    BigNumber: z.object({}),
    // ...
};

// export const SlideDecoration = ({
//     primaryColor,
//     secondaryColor,
//     tertiaryColor,
//     accentColor,
//     decorationid,
//     cover,
//     cta,
//     even,
//     alternateColors,
// }: DecorativeElementsProps) => {
//     const DecorationComponent = decorationMap[decorationid];
//     return (
//         <DecorationComponent
//             primaryColor={primaryColor}
//             secondaryColor={secondaryColor}
//             tertiaryColor={tertiaryColor}
//             cover={cover}
//             cta={cta}
//             even={even}
//             alternateColors={alternateColors}
//             accentColor={accentColor}
//         />
//     );
// };
