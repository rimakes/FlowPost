// TODO: This should be rendered statically, but then I cannot use the session provider in the layout...?

import { BlogCard } from '@/app/(public)/blog/_components/BlogCard';
import { getBlogPostList } from '@/lib/fileHelpers';

export default async function Home() {
    // const session = await auth();

    const posts = await getBlogPostList();

    return (
        <div className={`flex flex-col gap-16`}>
            <div className='space-y-4'>
                <p className='text-sm font-semibold text-indigo-500'>
                    Nuestro blog
                </p>
                <h1 className='text-3xl font-bold'>Marca tu marca</h1>
                <p className='text-primary/60'>
                    Descubre el poder de la marca personal conmigo
                </p>
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
                {posts.map(({ abstract, publishedOn, slug, title }) => (
                    <BlogCard
                        abstract={abstract}
                        date={publishedOn}
                        key={slug}
                        title={title}
                        image={`/images/blog/${slug}.webp`}
                        url={`/blog/${slug}`}
                    />
                ))}
            </div>
        </div>
    );
}
