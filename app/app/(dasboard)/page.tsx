// import { auth } from '@/auth';
import { Heading } from '@/components/shared/Heading';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
    // const session = await auth();

    return (
        <>
            <Heading
                className='mt-6'
                title='Selecciona una tarea'
                subtitle='¿Qué quieres hacer hoy?'
            />
            <Separator />
            <div className='mt-6 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                <PostGeneratorCard
                    title='Dale una idea y deja que la IA genere tus posts'
                    headline='De idea a post'
                    subtitle='Podrás personalizar el tono, y la estructura que más encaje con tu marca'
                    url='/app/post-writter'
                    headerClassName='bg-pink-100'
                />
                <PostGeneratorCard
                    title='Escribe tu post apoyado por IA'
                    headline='De cero'
                    subtitle='Ideal para cuando tienes claro qué quieres escribir pero quieres algo de ayuda'
                    url='/app/post-writter/new'
                    headerClassName='bg-indigo-100'
                />
            </div>
        </>
    );
}

export type PostGeneratorCardProps = {
    url: string;
    headline: string;
    title: string;
    subtitle: string;
    headerClassName?: string;
    imageUrl?: string;
};

const PostGeneratorCard = ({
    url,
    headline,
    title,
    subtitle,
    headerClassName,
    imageUrl,
}: PostGeneratorCardProps) => {
    return (
        <Link href={url} className='h-full w-full'>
            <Card className='h-full'>
                <CardHeader
                    className={cn(
                        `bg-[url(/images/decoration/patterns/circles-pattern.svg)] bg-no-repeat bg-indigo-100 bg-opacity-70 bg-blend-lighten h-32`,
                        headerClassName
                    )}
                >
                    <CardTitle
                        className='text-indigo-700 flex flex-col justify-center items-center h-full
                    '
                    >
                        {headline}
                    </CardTitle>
                </CardHeader>
                <CardContent className='py-8 px-4'>
                    <p className='font-semibold'>{title}</p>
                    <CardDescription>{subtitle}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
};
