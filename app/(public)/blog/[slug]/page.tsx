import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata, ResolvingMetadata } from 'next';
import { getBlogPostList, loadBlogPost } from '@/lib/fileHelpers';
import { AuthorCard } from '@/app/(public)/blog/_components/AuthorCard';
import { TBlogPostMetadata } from '@/types/types';
import { PostImage } from '@/app/(public)/blog/_components/PostImage';
import { Heading2 } from '@/app/(public)/blog/_components/H2';
import { Message } from '@/components/auth/Message';

type Props = {
    params: { slug: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const post = await loadBlogPost(params.slug);
    if (!post) {
        return notFound();
    }
    const metadata = post.frontmatter as TBlogPostMetadata;
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: metadata.title,
    };
}

export async function generateStaticParams() {
    const posts = await getBlogPostList();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Page({ params }: Props) {
    const post = await loadBlogPost(params.slug);
    if (!post) {
        return notFound();
    }
    const metadata = post.frontmatter as TBlogPostMetadata;
    const { publishedOn, title, abstract, topic, tags } = metadata;

    return (
        <article className='mx-auto flex max-w-[60ch]  flex-col gap-12 '>
            <div className='mx-auto flex max-w-[60ch] flex-col items-center gap-6'>
                <p className='text-sm font-semibold text-indigo-600'>{topic}</p>
                <h1 className='text-3xl font-semibold'>{title}</h1>
                <p className=' text-center text-primary/60'>{abstract}</p>
                <AuthorCard date={publishedOn} />
                {tags && (
                    <div className='flex gap-2'>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className='rounded-full border border-indigo-100 bg-indigo-50 px-2 py-1 text-xs text-indigo-600'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <Image
                src={`/images/blog/${params.slug}.webp`}
                alt={title}
                width={1024}
                height={560}
                className='mx-auto max-w-full'
            />
            <div className=''>
                <MDXRemote
                    source={post.content}
                    components={{
                        PostImage,
                        Heading2,
                        Message,
                        p: ({ children }) => (
                            <p className='my-6 leading-6 text-primary/90'>
                                {children}
                            </p>
                        ),
                        h3: ({ children }) => (
                            <h3 className='mb-4 mt-6 text-lg font-[500]'>
                                {children}
                            </h3>
                        ),
                        h2: ({ children }) => (
                            <h2 className='mb-4 mt-8 text-2xl font-[600]'>
                                {children}
                            </h2>
                        ),
                        ul: ({ children }) => (
                            <ul className='my-4 list-disc space-y-2  pl-8 '>
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className='my-4 list-decimal space-y-2 pl-8'>
                                {children}
                            </ol>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className='my-6 border-l-4 border-primary/20 pl-4'>
                                {children}
                            </blockquote>
                        ),
                        a: ({ children, href }) => (
                            <a
                                href={href}
                                className='font-semibold text-indigo-500'
                            >
                                {children}
                            </a>
                        ),
                    }}
                />
            </div>
        </article>
    );
}
