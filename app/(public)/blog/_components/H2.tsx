import { ReactNode } from 'react';

type H2Props = {
    children?: ReactNode;
    id: string;
};
export function Heading2({ id, children }: H2Props) {
    return (
        <h2 className='mb-4 mt-8 text-2xl font-[600]' id={id}>
            {children}
        </h2>
    );
}
