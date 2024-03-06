import { TBrand } from '@/types/types';

type ListSlideProps = {
    brand: TBrand;
    list: string[];
};

export const ListSlide = ({ brand, list }: ListSlideProps) => {
    return (
        <div className='flex flex-col gap-4 h-full p-4'>
            <h1
                style={{
                    fontSize: '3rem',
                    lineHeight: 1,
                }}
            >
                We are Here!
            </h1>
            <ul
                className='px-6 flex flex-col gap-2'
                style={{
                    fontWeight: 300,
                }}
            >
                {list.map((item, index) => {
                    return (
                        <li key={index}>
                            <div
                                className='flex gap-2 items-start'
                                style={{
                                    fontSize: '1.2rem',
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <p>{item}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
