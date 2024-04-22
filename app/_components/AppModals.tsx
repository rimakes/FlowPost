'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useContext, useEffect, useState } from 'react';
import { BrandKitEditForm } from '../app/settings/_components/BrandKitEditForm';
import { defaultValues } from '@/config/const';
import { useSession } from 'next-auth/react';
import { AppContext } from '@/providers/AppProvider';
import { differenceInCalendarDays } from 'date-fns';
import { wait } from '@/lib/utils';

type AppModalsProps = {};
export function AppModals({}: AppModalsProps) {
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
    const daysSinceLastInteraction = profileSetup?.lastInteraction
        ? differenceInCalendarDays(todayDay, profileSetup?.lastInteraction!)
        : undefined;
    const hasBrands = data?.user?.brands?.length! > 0;

    const brandSetupNotification =
        !hasBrands &&
        !profileSetup?.done &&
        (profileSetup?.dimissals! === 0 || daysSinceLastInteraction! > 0);

    useEffect(() => {
        if (brandSetupNotification) {
            setIsOpen(true);
        }
    }, [notifications, brandSetupNotification]);

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
                        // Let the modal time to close
                        await wait(500);
                        brandCreated();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
