import { ArrowRight, Circle, TrendingUp } from 'lucide-react';

type DecorativeElementsProps = {
    primaryColor: string;
    secondaryColor: string;
    decorationid: keyof typeof decorationMap;
    even?: boolean;
    cover?: boolean;
    cta?: boolean;
};

type DecorationProps = {
    primaryColor: string;
    secondaryColor: string;
    even?: boolean;
    cover?: boolean;
    cta?: boolean;
};

const Squares = ({ primaryColor, secondaryColor }: DecorationProps) => {
    return (
        <div className='absolute h-full w-full top-0 left-0 bg-squares'></div>
    );
};

const Topo = ({ primaryColor, secondaryColor }: DecorationProps) => {
    return <div className='absolute h-full w-full top-0 left-0 bg-topo'></div>;
};

const Arrows = ({ primaryColor, secondaryColor }: DecorationProps) => {
    return (
        <div className='absolute h-full w-full top-0 left-0 opacity-25'>
            <ArrowRight
                className='absolute top-8 translate-x-1/2 right-0'
                size={140}
                color={secondaryColor}
            />
            <ArrowRight
                className='absolute top-8 -translate-x-1/2 left-0'
                size={140}
                color={secondaryColor}
            />
            <ArrowRight
                className='absolute bottom-12 translate-x-1/4 right-0'
                size={240}
                color={secondaryColor}
            />
            <ArrowRight
                className='absolute bottom-12 -translate-x-3/4 left-0'
                size={240}
                color={secondaryColor}
            />
        </div>
    );
};

const Bubbles = ({
    primaryColor,
    secondaryColor,
    cover,
    cta,
    even,
}: DecorationProps) => {
    const Element = (
        <>
            <Circle
                className='absolute bottom-0 translate-x-1/2 translate-y-1/2 right-0'
                size={140}
                color={secondaryColor}
                absoluteStrokeWidth={true}
                strokeWidth={8}
            />
            <Circle
                className='absolute bottom-0 translate-x-1/2 translate-y-1/2 right-0'
                size={200}
                color={secondaryColor}
                absoluteStrokeWidth={true}
                strokeWidth={8}
            />
            <Circle
                className='absolute bottom-0 translate-x-1/2 translate-y-1/2 right-0'
                size={260}
                color={secondaryColor}
                absoluteStrokeWidth={true}
                strokeWidth={8}
            />
            <Circle
                className='absolute bottom-0 translate-x-1/2 translate-y-1/2 right-0'
                size={320}
                color={secondaryColor}
                absoluteStrokeWidth={true}
                strokeWidth={8}
            />
        </>
    );

    return (
        <div className='absolute h-full w-full top-0 left-0 opacity-25'>
            <div className='absolute bg-green-500 bottom-0 right-0'>
                {!cta && !even && Element}
            </div>
            <div className='absolute bg-green-500 bottom-0 left-0'>
                {!cover && even && Element}
            </div>
            <div className='absolute bg-green-500 top-0 right-0'>
                {!cta && even && Element}
            </div>
            <div className='absolute bg-green-500 top-0 left-0'>
                {!cover && !even && Element}
            </div>
        </div>
    );
};

const Trending = ({
    primaryColor,
    secondaryColor,
    cover,
    cta,
    even,
}: DecorationProps) => {
    const Element = (
        <>
            <TrendingUp
                className='absolute bottom-0 translate-x-3/4 translate-y-3/4 right-0'
                size={360}
                color={secondaryColor}
                absoluteStrokeWidth={true}
                strokeWidth={24}
            />
        </>
    );

    return (
        <div className='absolute h-full w-full top-0 left-0 opacity-25'>
            <div className='absolute bottom-40 right-0'>
                {!cta && !even && Element}
            </div>
            <div className='absolute bg-green-500 bottom-40 left-0'>
                {!cover && even && Element}
            </div>
            <div className='absolute bg-green-500 top-0 right-0'>
                {!cta && even && Element}
            </div>
            <div className='absolute bg-green-500 top-0 left-0'>
                {!cover && !even && Element}
            </div>
        </div>
    );
};

export const decorationMap = {
    Squares: Squares,
    Topo: Topo,
    Arrows: Arrows,
    Bubbles: Bubbles,
    Trending: Trending,
};

export const Decoration = ({
    primaryColor,
    secondaryColor,
    decorationid,
    cover,
    cta,
    even,
}: DecorativeElementsProps) => {
    const DecorationComponent = decorationMap[decorationid];
    return (
        <DecorationComponent
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            cover={cover}
            cta={cta}
            even={even}
        />
    );
};
