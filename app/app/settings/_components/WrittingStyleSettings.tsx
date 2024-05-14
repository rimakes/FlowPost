'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TLinkedinPost, TWrittingStyle } from '@/types/types';
import { SettingsSectionHeader } from '@/app/app/settings/_components/SettingsSectionHeader';
import { buttonVariants } from '@ui/button';

type WrittingStyleSettingsProps = {
    writtingStyles: TWrittingStyle[];
    posts: TLinkedinPost[];
};
export function WrittingStyleSettings({
    writtingStyles,
    posts,
}: WrittingStyleSettingsProps) {
    const { data: session } = useSession();

    return (
        <div>
            <SettingsSectionHeader
                title='Haz que tu IA escriba como tú'
                subtitle='Configura tu estilo de escritura'
            >
                <Link
                    href={'/app/settings/writting-styles/new'}
                    className={buttonVariants({})}
                >
                    + Añadir Estilo
                </Link>
            </SettingsSectionHeader>
            <div className='mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {writtingStyles.map((style) => (
                    <div
                        key={style.id}
                        className='flex items-center justify-between gap-2 rounded-lg border p-4'
                    >
                        <div>
                            <h3>{style.name}</h3>
                            <p className='text-sm italic text-primary/60'>
                                Creado con: {style.inputs.posts.length} posts
                            </p>
                        </div>
                        <Link
                            href={`/app/settings/writting-styles/${style.id}`}
                            className={buttonVariants({})}
                        >
                            Editar
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
