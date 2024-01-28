import { auth } from '@/auth';
import { Header } from '@/components/shared/header';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function Home() {
    const session = await auth();

    return (
        <>
            <Header
                className='mt-6'
                title='Genera post con IA'
                subtitle='Selecciona una plantilla para generar tu post'
            />
            <Separator />
            <div className='mt-6 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
                <PostGeneratorCard url='/app/custom' />
            </div>
        </>
    );
}

const PostGeneratorCard = ({ url }: { url: string }) => {
    return (
        <Link href={url}>
            <Card>
                <CardHeader className='bg-[url(/images/decoration/patterns/circles-pattern.svg)] bg-no-repeat bg-indigo-100 bg-opacity-70 bg-blend-lighten h-32'>
                    <CardTitle
                        className='text-indigo-700 flex flex-col justify-center items-center h-full
                    '
                    >
                        From Scratch
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='font-semibold'>Something cools goes here</p>
                    <CardDescription>
                        Genera un post a partir de cero
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
};
