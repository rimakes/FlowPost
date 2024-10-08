// TODO: This should be rendered statically, but then I cannot use the session provider in the layout...?

import { BlogCard } from '@/app/(public)/blog/_components/BlogCard';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getBlogPostList } from '@/lib/fileHelpers';

export default async function Home() {
    // const session = await auth();

    // const altPosts = await getPosts();
    // console.log(altPosts);
    const posts = await getBlogPostList();
    const breadcrumbs = [
        {
            label: 'Inicio',
            path: '/',
        },
        {
            label: 'Blog',
            path: '/blog',
        },
    ];

    return (
        <div className={`flex flex-col gap-16`}>
            <div className='space-y-4'>
                <p className='text-sm font-semibold text-indigo-500'>
                    Nuestro blog
                </p>
                <h1 className='text-3xl font-bold'>El Blog de FlowPost</h1>
                <p className='text-primary/60'>
                    Compartimos nuestro camino creando la mejor herramienta de
                    creación de contenido para LinkedIn.
                </p>
                <Breadcrumbs items={breadcrumbs} />
            </div>
            <div
                className='
                grid
                grid-cols-1
                gap-x-8
                gap-y-16
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-3
                
                '
            >
                {posts.map(({ abstract, publishedOn, slug, title, topic }) => (
                    <BlogCard
                        abstract={abstract}
                        date={publishedOn}
                        key={slug}
                        title={title}
                        image={`/images/blog/${slug}.webp`}
                        url={`/blog/${slug}`}
                        topic={topic}
                    />
                ))}
            </div>
        </div>
    );
}
