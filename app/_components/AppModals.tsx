'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { BrandKitCard } from '../app/settings/_components/BrandKitCard';
import { BrandKitEditForm } from '../app/settings/_components/BrandKitEditForm';
import { defaultValues } from '@/config/const';
import { useSession } from 'next-auth/react';
import { AppContext } from '@/providers/AppProvider';
import { getDate, getDay, differenceInCalendarDays } from 'date-fns';

type AppModalsProps = {};
export function AppModals({}: AppModalsProps) {
    // If there is a ?modal= query parameter, show the modal
    const query = useSearchParams();
    // TODO: how do I simplify it so I don't depend on sessions? can we use the AppProvider?
    const { data, update } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const {
        notifications,
        notifications: { profileSetup },
        brandCreated,
        brandCreateDismissed,
    } = useContext(AppContext);

    const todayDay = new Date();
    const daysSinceLastInteraction = differenceInCalendarDays(
        todayDay,
        profileSetup?.lastInteraction!
    );
    const hasBrands = data?.user?.brands?.length! > 0;

    const profileSetupNotification =
        !hasBrands && !profileSetup?.done && daysSinceLastInteraction > 0;

    useEffect(() => {
        if (profileSetupNotification) {
            setIsOpen(true);
        }
    }, [notifications, profileSetupNotification]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                setIsOpen(value);
                if (value === false) brandCreateDismissed();
            }}
        >
            <DialogContent>
                <h1 className='text-2xl font-bold text-center mb-4'>
                    ✨ ¡Crear tu primera marca!
                </h1>
                <p className='text-center text-gray-600 mb-8'>
                    Así podremos personalizar tu contenido y darte una mejor
                    experiencia.
                </p>
                <BrandKitEditForm
                    defaultValues={defaultValues}
                    onSave={async () => {
                        setIsOpen(false);
                        brandCreated();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
