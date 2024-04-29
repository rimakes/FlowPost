'use client';

import { useLocalStorage } from '@mantine/hooks';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { deepCopy } from '@/lib/utils';
import { AppNotifications } from '@/types/types';

type ContextProps = {
    notifications: AppNotifications;
    setNotifications: Dispatch<SetStateAction<AppNotifications>>;
    brandCreated: () => void;
    brandCreateDismissed: () => void;
    setAccessModalIsOpen: Dispatch<SetStateAction<boolean>>;
    accessModalIsOpen: boolean;
    creditBalance: number;
    setCreditBalance: Dispatch<SetStateAction<number>>;
    subscription: string;
};

export const AppContext = createContext<ContextProps>({
    notifications: {} as AppNotifications,
    setNotifications: () => ({}) as AppNotifications,
    brandCreated: () => {},
    brandCreateDismissed: () => {},
    setAccessModalIsOpen: () => false,
    accessModalIsOpen: false,
    creditBalance: 0,
    setCreditBalance: () => 0,
    subscription: '',
});

export function AppProvider({
    children,
    userFE,
}: {
    children: React.ReactNode;
    userFE: {
        credits: number;
        subscription: string;
    };
}) {
    const [accessModalIsOpen, setAccessModalIsOpen] = useState<boolean>(false);
    const [creditBalance, setCreditBalance] = useState<number>(userFE.credits);
    const [notifications, setNotifications] = useLocalStorage<AppNotifications>(
        {
            key: 'notifications',
            defaultValue: {
                profileSetup: {
                    done: false,
                    dimissals: 0,
                    lastInteraction: new Date(),
                    lastShown: new Date(),
                    type: 'info',
                },
            },
            getInitialValueInEffect: false,
        }
    );

    const brandCreated = () => {
        const newNotifications = deepCopy(notifications);
        if (!newNotifications.profileSetup) {
            return;
        }
        newNotifications.profileSetup.done = true;
        newNotifications.profileSetup.lastInteraction = new Date();
        setNotifications(newNotifications);
    };

    const brandCreateDismissed = () => {
        if (!notifications.profileSetup) {
            return;
        }
        setNotifications({
            profileSetup: {
                ...notifications.profileSetup,
                done: false,
                lastInteraction: new Date(),
                lastShown: new Date(),
                dimissals: notifications.profileSetup?.dimissals! + 1,
            },
        });
    };

    return (
        <AppContext.Provider
            value={{
                brandCreateDismissed,
                setCreditBalance,
                brandCreated,
                notifications,
                setNotifications,
                accessModalIsOpen,
                setAccessModalIsOpen,
                creditBalance,
                subscription: userFE.subscription,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
