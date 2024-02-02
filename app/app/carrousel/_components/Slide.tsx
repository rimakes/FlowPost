import { cn, isEven } from '@/lib/utils';
import Image from 'next/image';
import {
    CSSProperties,
    forwardRef,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { CarouselContext } from './ContextProvider';
import { SlideType as SlideType } from '../page';
import { QuadPattern } from '@/public/images/decoration/patterns/qqquad';
import { secondaryFont } from '@/config/fonts';
import { SvgWrapper } from '@/components/shared/SvgWrapper';
import pattern from '@/public/images/decoration/patterns/i-like-food.svg';
import { FoodPattern } from '@/public/images/decoration/patterns/i-like-food';
import ContentEditable from 'react-contenteditable';

type SlideProps = {
    backgroundColor?: string;
    fontColor: string;
    profilePictureUrl: string;
    handle: string;
    name: string;
    title: string;
    description: string;
    isActive: boolean;
    slide: SlideType;
    className?: string;
    slideNumber: number;
    setIsActive: (value: boolean) => void;
};

type Ref = HTMLDivElement;

// TODO: if you need to resize the font based on parent container width, use this: https://codepen.io/tunglam/pen/xxZqrbr
// TODO: Carousel snap: https://codepen.io/andy-set-studio/pen/wvoLLXo
// TODO: Reference canva clone: https://github.com/msafeerhussain/canva-clone
export const Slide = forwardRef<Ref, SlideProps>(
    (
        {
            backgroundColor: originalBackgroundColor,
            fontColor: originalFontColor,
            profilePictureUrl,
            handle,
            name,
            className,
            isActive = true,
            slide,
            slideNumber,
            setIsActive,
        },
        ref
    ) => {
        const {
            title,
            description,
            hasCounter,
            hasParagraph,
            hasTagline,
            hasTitle,
        } = slide;

        const {
            editTitle,
            editDescription,
            carousel: { settings, swipeLabel, slides },
        } = useContext(CarouselContext);

        const backgroundColor =
            isEven(slideNumber) && settings.alternateColors
                ? originalFontColor
                : originalBackgroundColor;

        const color =
            isEven(slideNumber) && settings.alternateColors
                ? originalBackgroundColor
                : originalFontColor;

        const isFirst = slideNumber === 0;
        const isLast = slideNumber === slides.length - 1;

        useEffect(() => {
            // console.log('ref from slide', ref);
        }, [ref]);

        return (
            <div className='slide text'>
                <div
                    ref={ref}
                    className={cn(
                        `border-0 border-border px-4 py-4 text-[0.75em]
                    relative w-[32.5em] aspect-[1080/1350] m-auto overflow-hidden flex flex-col justify-between
                    `,
                        className,
                        isActive
                            ? ''
                            : 'hover:cursor-pointer hover:filter hover:brightness-75 transition-[filter]'
                    )}
                    style={{
                        backgroundColor,
                        color,
                    }}
                    onClick={() => setIsActive(true)}
                >
                    <DecorativeElements
                        primaryColor={backgroundColor!}
                        secondaryColor={color!}
                    />
                    <SlideContent
                        hasTitle={hasTitle}
                        title={title!}
                        hasParagraph={hasParagraph}
                        description={description!}
                        editTitle={editTitle}
                        editDescription={editDescription}
                        color={color!}
                        backgroundColor={backgroundColor!}
                    />
                    <ProfileBadge
                        isShown={settings.showAuthor && (isFirst || isLast)}
                        profilePictureUrl={profilePictureUrl}
                        handle={handle}
                        name={name}
                    />
                    <SlideNumber
                        slideNumber={slideNumber}
                        numberColor={backgroundColor}
                        backgroundColor={color}
                        styles={{
                            display: settings.showCounter ? 'flex' : 'none',
                        }}
                    />
                    <SwipeLabel
                        swipeLabel={swipeLabel!}
                        style={{
                            display: settings.showSwipeLabel ? 'block' : 'none',
                        }}
                    />
                </div>
            </div>
        );
    }
);

Slide.displayName = 'Slide';

type SwipeLabelProps = {
    swipeLabel: string;
    className?: string;
    style?: CSSProperties;
};

const SwipeLabel = ({ swipeLabel, className, style = {} }: SwipeLabelProps) => (
    <div
        className={cn(
            `p-2 px-4 border rounded-full ml-auto absolute bottom-4 right-4`,
            className
        )}
        style={{
            ...style,
        }}
    >
        {swipeLabel}
    </div>
);

type DecorativeElementsProps = {
    primaryColor: string;
    secondaryColor: string;
};

export const DecorativeElements = ({
    primaryColor,
    secondaryColor,
}: DecorativeElementsProps) => {
    return (
        <div className='absolute h-full w-full top-0 left-0'>
            <SvgWrapper
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            >
                <QuadPattern />
            </SvgWrapper>
        </div>
    );
};

type SlideContentProps = {
    hasTitle: boolean;
    title: string;
    hasParagraph: boolean;
    description: string;
    editTitle: (value: string) => void;
    editDescription: (value: string) => void;
    color: string;
    backgroundColor: string;
};

const SlideContent = ({
    hasTitle,
    title,
    hasParagraph,
    description,
    editTitle,
    editDescription,
}: SlideContentProps) => {
    const titleRef = useRef('');
    const paragraphRef = useRef('');

    useEffect(() => {
        titleRef.current = title;
        paragraphRef.current = description;
    }, [title, description]);

    return (
        <div className='py-8 z-10'>
            <ContentEditable
                onChange={(event) => {
                    console.log(event.target.value);
                    titleRef.current = event.target.value;
                    editTitle(event.target.value);
                }}
                html={titleRef.current}
                style={{
                    display: hasTitle ? 'block' : 'none',
                }}
                className='uppercase text-[3em] focus:outline-none focus:ring-0 focus:border-transparent'
            />
            <ContentEditable
                onChange={(event) => {
                    console.log(event.target.value);
                    paragraphRef.current = event.target.value;
                    editDescription(event.target.value);
                }}
                html={paragraphRef.current}
                className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                style={{
                    display: hasParagraph ? 'block' : 'none',
                }}
            />
        </div>
    );
};

type ProfileBadgeProps = {
    isShown: boolean;
    profilePictureUrl?: string;
    handle: string;
    name: string;
    styles?: CSSProperties | undefined;
};

export const ProfileBadge = ({
    isShown,
    profilePictureUrl,
    handle,
    name,
    styles,
}: ProfileBadgeProps) => {
    return (
        <div
            className='gap-4 items-center absolute bottom-2 left-2'
            style={{
                display: isShown ? 'flex' : 'none',
                ...styles,
            }}
        >
            <div className='h-[5em] w-[5em] rounded-full relative'>
                <Image
                    src={
                        profilePictureUrl
                            ? profilePictureUrl
                            : '/images/placeholders/user.png'
                    }
                    fill
                    alt='placeholder'
                />
            </div>
            <div className='flex flex-col mr-auto'>
                <p className='font-semibold'>{name}</p>
                <p className=''>{handle}</p>
            </div>
        </div>
    );
};

type SlideNumberProps = {
    slideNumber: number;
    numberColor?: string;
    backgroundColor?: string;
    styles?: CSSProperties | undefined;
};

export const SlideNumber = ({
    slideNumber,
    numberColor,
    backgroundColor,
    styles,
}: SlideNumberProps) => {
    return slideNumber === 0 ? null : (
        <div
            className='rounded-full w-10 h-10 flex items-center justify-center text-[0.75rem] mx-auto'
            style={{
                backgroundColor,
                color: numberColor,
                ...styles,
            }}
        >
            {slideNumber + 1}
        </div>
    );
};
