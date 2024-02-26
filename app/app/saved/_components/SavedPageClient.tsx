'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TCarousel, TLinkedinPost } from '@/types/types';
import { TabsContent } from '@radix-ui/react-tabs';
import { PostCard } from './PostCard';
import { CarouselCard } from './CarouselCard';

type SavedPageClientProps = {
    posts: TLinkedinPost[];
    carrusels: TCarousel[];
};
export function SavedPageClient({ posts, carrusels }: SavedPageClientProps) {
    return (
        <Tabs defaultValue='posts'>
            <TabsList className='flex gap-2 w-fit'>
                <TabsTrigger value='posts'>
                    <h1>Posts</h1>
                </TabsTrigger>
                <TabsTrigger value='carousels'>
                    <h1>Carrusels</h1>
                </TabsTrigger>
            </TabsList>
            <TabsContent value='posts'>
                <div className='mt-6 gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 '>
                    {posts.map((post) => {
                        return <PostCard key={post.id} post={post} />;
                    })}
                </div>
            </TabsContent>
            <TabsContent value='carousels'>
                <div className='mt-6 gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 '>
                    {carrusels.map((carousel) => {
                        return (
                            <CarouselCard
                                key={carousel.id}
                                carousel={carousel}
                            />
                        );
                    })}
                </div>
            </TabsContent>
        </Tabs>
    );
}
