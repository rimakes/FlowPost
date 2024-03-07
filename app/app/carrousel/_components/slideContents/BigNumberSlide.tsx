import { TBrand } from '@/types/types';

type BigNumberSlideProps = {
    title: string;
    brand: TBrand;
    bigCharacter: string;
    tagline: string;
};

export const BigNumber = ({
    brand,
    bigCharacter,
    title,
    tagline,
}: BigNumberSlideProps) => {
    return (
        <>
            <div
                className='absolute w-full h-full top-0 left-0'
                style={{
                    fontSize: '40em',
                    color: brand.colorPalette.accent,
                    opacity: 0.2,
                }}
            >
                <div
                    id='number'
                    className='absolute top-0 right-0 -z-20'
                    style={{
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    {bigCharacter}
                </div>
            </div>
            <div
                className='flex-grow  flex flex-col justify-center'
                style={{
                    alignItems: 'start',
                }}
            >
                <h2
                    style={{
                        fontSize: '5em',
                        fontFamily: brand.fontPalette.primary,
                    }}
                >
                    {title}
                </h2>
                <p>{tagline}</p>
            </div>
        </>
    );
};
