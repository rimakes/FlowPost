import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { TBlogPostMetadata } from '@/types/types';

export async function getBlogPostList() {
    const fileNames = await readDirectory('/app/(public)/blog/_posts');

    const blogPosts = [];

    for (let fileName of fileNames) {
        const rawContent = await readFile(
            `/app/(public)/blog/_posts/${fileName}`
        );

        const { data: frontmatter } = matter(rawContent);
        blogPosts.push({
            slug: fileName.replace('.mdx', ''),
            ...frontmatter,
        });
    }

    return blogPosts.sort((p1, p2) => {
        // @ts-ignore
        const date1 = new Date(p1.publishedOn);
        // @ts-ignore
        const date2 = new Date(p2.publishedOn);

        return date1 < date2 ? 1 : -1;
    }) as TBlogPostMetadata[];
}

export async function loadBlogPost(slug: string) {
    let rawContent: string;

    try {
        rawContent = await readFile(`/app/(public)/blog/_posts/${slug}.mdx`);
    } catch (error) {
        return null;
    }

    const { data: frontmatter, content } = matter(rawContent);
    const headings = getHeadings(content);

    return { frontmatter, content, headings };
}

function readFile(localPath: string) {
    return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

function readDirectory(localPath: string) {
    return fs.readdir(path.join(process.cwd(), localPath));
}

const getHeadings = (source: string) => {
    const regex = /(?<=^## ).*$/gm;

    const matches = source.match(regex);

    // If there are not h2, return an empty array
    if (!matches) {
        console.log('No matches');
        return [];
    }

    return matches.map((match) => {
        return {
            link: `#${match
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^a-zA-Z0-9-]/g, '')}`,
            text: match,
        };
    });
};
