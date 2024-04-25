import { cn } from '@/lib/utils';

const elements = [
    '###FIRST###',
    'Get more followers',
    'Save time',
    'Save time',
    'Save time',
    'Increase your productivity',
    'Get more engagement',
    '### LAST ###',
];

type SlidingElementsProps = {
    elements: string[];
    direction?: 'left' | 'right';
};

export const SlidingElements = () => {
    return (
        <section className='flex w-[100vw] flex-col items-center gap-8'>
            <h2 className=''>Todo lo que necesitas</h2>
            <div
                className='relative flex w-full flex-col items-center justify-center
             gap-8
            '
            >
                <SlidingRow elements={elements} direction='left' />
                <SlidingRow elements={elements} direction='right' />
            </div>
        </section>
    );
};

function SlidingRow({ elements, direction }: SlidingElementsProps) {
    return (
        <div
            className='
            before:content-["
            "]
                after:content-["

            "]
            relative flex
            w-full
            overflow-hidden
            before:absolute
            before:left-0
            before:top-0
            before:z-10
            before:h-full
            before:w-[50px]
            before:bg-gradient-to-r
            before:from-background
            before:to-transparent
            after:absolute after:right-0
            after:top-0
            after:z-10
            after:h-full
            after:w-[50px]
            after:bg-gradient-to-l
            after:from-background
            after:to-transparent
            before:md:w-[150px]
            after:md:w-[150px]
            before:lg:w-[200px]
            after:lg:w-[200px]
            '
        >
            <div className='flex'>
                <ul
                    className={`
                        relative
                    flex
                    min-w-fit
                    will-change-transform
                    ${
                        direction === 'left'
                            ? 'animate-slide-left'
                            : 'animate-slide-right'
                    }
                    `}
                >
                    {elements.map((element, index) => {
                        return (
                            <li key={index} className='ml-8'>
                                <Element label={element} className='text-sm' />
                            </li>
                        );
                    })}
                </ul>
                <ul
                    className={`
                        relative
                    flex
                    min-w-fit
                    will-change-transform
                    ${
                        direction === 'left'
                            ? 'animate-slide-left'
                            : 'animate-slide-right'
                    }
                    `}
                >
                    {elements.map((element, index) => {
                        return (
                            <li key={index} className='ml-8'>
                                <Element label={element} className='text-sm' />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

type ElementProps = {
    label: string;
    className: string;
};
const Element = ({ label, className }: ElementProps) => {
    return (
        <div
            className={cn(
                `box-border inline-block whitespace-nowrap rounded-full bg-slate-500/25 p-5`,
                className
            )}
        >
            {label}
        </div>
    );
};
