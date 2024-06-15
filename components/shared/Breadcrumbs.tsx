import Link from 'next/link';
import { Route } from 'next';
import { StructuredData } from '@/scripts/structured-data';

// BOILER:
// defining the Props
export type CrumbItem = {
    label: string; // e.g., Python
    path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
    items: CrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <>
            <div className='flex items-start gap-2'>
                {items.map((crumb, i) => {
                    const isLastItem = i === items.length - 1;
                    if (!isLastItem) {
                        return (
                            <>
                                <Link
                                    href={crumb.path as Route}
                                    key={i}
                                    className='text-primary hover:text-primary/70 hover:underline'
                                >
                                    {crumb.label}
                                </Link>
                                {/* separator */}
                                <span> / </span>
                            </>
                        );
                    } else {
                        return crumb.label;
                    }
                })}
            </div>
            <StructuredData breadcrumbs={items} />
        </>
    );
};
export default Breadcrumbs;
