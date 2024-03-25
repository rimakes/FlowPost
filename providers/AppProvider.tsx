'use client';

import { deepCopy } from '@/lib/utils';
import { AppNotifications } from '@/types/types';
import { useLocalStorage } from '@mantine/hooks';
// import { useLocalStorage } from '@uidotdev/usehooks';
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react';

interface ContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>; //REVIEW: Why this is type Dispatch<SetStateAction<boolean>>?
    notifications: AppNotifications;
    setNotifications: Dispatch<SetStateAction<AppNotifications>>;
    brandCreated: () => void;
    brandCreateDismissed: () => void;
}

export const AppContext = createContext<ContextProps>({
    sidebarOpen: false,
    setSidebarOpen: (): boolean => false,
    notifications: {} as AppNotifications,
    setNotifications: () => ({}) as AppNotifications,
    brandCreated: () => {},
    brandCreateDismissed: () => {},
});

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
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
                sidebarOpen,
                setSidebarOpen,
                notifications,
                setNotifications,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);
