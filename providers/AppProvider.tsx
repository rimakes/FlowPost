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
};

export const AppContext = createContext<ContextProps>({
    notifications: {} as AppNotifications,
    setNotifications: () => ({}) as AppNotifications,
    brandCreated: () => {},
    brandCreateDismissed: () => {},
    setAccessModalIsOpen: () => false,
    accessModalIsOpen: false,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [accessModalIsOpen, setAccessModalIsOpen] = useState<boolean>(false);

    // REVIEW: Why this hook is problematic?
    // https://github.com/uidotdev/usehooks/issues/218
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
                brandCreated,
                notifications,
                setNotifications,
                accessModalIsOpen,
                setAccessModalIsOpen,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
