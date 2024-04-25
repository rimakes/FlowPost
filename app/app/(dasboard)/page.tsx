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
import { WRITTER_TOOLS } from '@/config/const';
import { cn } from '@/lib/utils';
import { Route } from 'next';
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
            <div className='mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                {WRITTER_TOOLS.map((tool) => (
                    <PostGeneratorCard
                        key={tool.url}
                        url={tool.url as Route}
                        name={tool.name}
                        title={tool.title}
                        subtitle={tool.subtitle}
                        headerClassName={tool.headerClassName}
                        imageUrl='/images/decoration/patterns/circles-pattern.svg'
                        titleClassName={tool.titleClassName}
                    />
                ))}
            </div>
        </>
    );
}

type PostGeneratorCardProps<T extends string> = {
    url: Route<T>;
    name: string;
    title: string;
    subtitle: string;
    headerClassName?: string;
    titleClassName: string;
    imageUrl?: string;
};

const PostGeneratorCard = <T extends string>({
    url,
    name,
    title,
    subtitle,
    headerClassName,
    titleClassName,
    imageUrl,
}: PostGeneratorCardProps<T>) => {
    return (
        <Link href={url} className='h-full w-full'>
            <Card className='h-full'>
                <CardHeader
                    className={cn(
                        `h-32 bg-opacity-70 bg-[url(/images/decoration/patterns/circles-pattern.svg)] bg-no-repeat bg-blend-lighten`,
                        headerClassName
                    )}
                >
                    <CardTitle
                        className={cn(
                            `flex h-full flex-col items-center justify-center text-indigo-700`,
                            titleClassName
                        )}
                    >
                        {name}
                    </CardTitle>
                </CardHeader>
                <CardContent className='px-4 py-8'>
                    <p className='font-semibold'>{title}</p>
                    <CardDescription>{subtitle}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
};
