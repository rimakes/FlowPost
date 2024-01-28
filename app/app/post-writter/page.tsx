import { Header } from '@/components/shared/header';
import { Separator } from '@/components/ui/separator';
import { PostWritterForm } from './_components/PostWritterForm';
import { PostWritterResult } from './_components/GeneratedPost';

export default function PostWritterPage() {
    return (
        <>
            <Header
                className='mt-6'
                title='Genera un post desde cero'
                subtitle='Utiliza el poder de la IA para generar post irresistibles'
            />
            <Separator />
            <div className='mt-6 space-y-4 2xl:flex gap-8'>
                <PostWritterForm className='flex-1' />
                <PostWritterResult className='flex-1' />
            </div>
        </>
    );
}
