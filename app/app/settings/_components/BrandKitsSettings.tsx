'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { z } from 'zod';
import { Brand } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { SettingsSectionHeader } from './SettingsSectionHeader';
import { BrandKitCard } from './BrandKitCard';
import { BrandKitEditForm } from './BrandKitEditForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { brandKitsSettingsSchema } from '@/types/schemas';
import { Button } from '@/components/ui/button';
import { defaultValues } from '@/config/const';

type BrandKitsSettingsForm = z.infer<typeof brandKitsSettingsSchema>;

type BrandKitsSettingsProps = {
    userBrandKits: Brand[];
};

export const BrandKitsSettings = ({
    userBrandKits,
}: BrandKitsSettingsProps) => {
    const { data: session } = useSession();
    const [status, setStatus] = useState('idle');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className='flex items-start justify-between'>
                <SettingsSectionHeader
                    title='Configuración de marca'
                    subtitle='Personaliza el contenido y la apariencia de tu marca'
                    className='mb-8'
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                        <Button>+ Añadir Marca</Button>
                    </DialogTrigger>
                    <DialogContent className='max-h-full overflow-y-auto'>
                        <div className='mt-4 max-w-md'>
                            <BrandKitEditForm
                                onSave={() => {
                                    setIsDialogOpen(false);
                                }}
                                defaultValues={defaultValues}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2  2xl:grid-cols-3'>
                {userBrandKits.map((brand) => (
                    <BrandKitCard brand={brand} key={brand.id} />
                ))}
            </div>
        </>
    );
};
