'use client';

import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { differenceInCalendarDays } from 'date-fns';
import { BrandKitEditForm } from '../../app/app/settings/_components/BrandKitEditForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { defaultValues } from '@/config/const';
import { AppContext } from '@/providers/AppProvider';
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
            onOpenChange={(value) => {
                setIsOpen(value);
                if (value === false) brandCreateDismissed();
            }}
        >
            <DialogContent className='max-h-full overflow-y-auto'>
                <h1 className='mb-4 text-center text-2xl font-bold'>
                    ✨ ¡Crear tu primera marca!
                </h1>
                <p className='mb-8 text-center text-gray-600'>
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
