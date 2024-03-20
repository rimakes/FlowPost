'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BrandKitCard } from '../app/settings/_components/BrandKitCard';
import { BrandKitEditForm } from '../app/settings/_components/BrandKitEditForm';
import { defaultValues } from '@/config/const';
import { useSession } from 'next-auth/react';

type AppModalsProps = {};
export function AppModals({}: AppModalsProps) {
    // If there is a ?modal= query parameter, show the modal
    const query = useSearchParams();
    const { data, update } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (data && (!data?.user?.brands || data?.user?.brands?.length === 0)) {
            console.log('no brands', data?.user);
            setIsOpen(true);
        }
    }, [data]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                setIsOpen(value);
            }}
        >
            <DialogContent>
                {JSON.stringify(!data?.user?.brands)}
                {JSON.stringify(data?.user?.brands?.length === 0)}
                <h1 className='text-2xl font-bold text-center mb-4'>
                    ✨ ¡Crear tu primera marcar!
                </h1>
                <p className='text-center text-gray-600 mb-8'>
                    Así podremos personalizar tu contenido y darte una mejor
                    experiencia.
                </p>
                <BrandKitEditForm
                    defaultValues={defaultValues}
                    onSave={async () => {
                        setIsOpen(false);
                        await update({
                            brands: ['brand1', 'brand2', 'brand3'],
                        });

                        // update user session
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
