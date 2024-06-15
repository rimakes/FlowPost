import { BreadcrumbList, WithContext } from 'schema-dts';
import { BreadcrumbsProps } from '@/components/shared/Breadcrumbs';
// https://developers.google.com/search/docs/appearance/structured-data?hl=es-419
// Not sure what the diff is in the links shown above

// BOILER

export function StructuredData({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbsProps['items'];
}) {
    const itemListElement = breadcrumbs.map((breadcrumb, index) => {
        return {
            '@type': 'ListItem' as 'ListItem',
            position: index + 1,
            name: breadcrumb.label,
            item: breadcrumb.path,
        };
    });

    const jsonLd: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itemListElement,
    };

    //   Example just for reference to get types
    //   const typeGetter: WithContext<BreadcrumbList> = {
    //     "@context": "https://schema.org",
    //     "@type": "BreadcrumbList",
    //     itemListElement: [
    //         {
    //             "@type": "ListItem",
    //             position: 1,
    //             name: "Books",
    //             item: "https://example.com/books",
    //         },
    //     ],
    //   };

    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
