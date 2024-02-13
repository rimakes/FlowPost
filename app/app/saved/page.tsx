import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/shared/Heading';
import { db } from '@/lib/prisma';
import { PostCard } from './_components/PostCard';

export default async function IdeasPage() {
    const findPostByUserId = async () => {
        return db.linkedinPost.findMany({
            where: {
                author: {
                    is: {
                        name: 'Ricardo Sala',
                    },
                },
            },
        });
    };

    const userPosts = await findPostByUserId();

    return (
        <div>
            <Heading
                className='mt-6'
                title='Genera un post desde cero'
                subtitle='Utiliza el poder de la IA para generar post que tu audiencia no pueda dejar de leer'
            />
            <Separator />
            <div className='mt-6 gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 '>
                {userPosts.map((post) => {
                    return <PostCard key={post.id} post={post} />;
                })}
            </div>
        </div>
    );
}
