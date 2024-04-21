import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/providers/session-provider';
import { Toaster } from '@/components/ui/sonner';
import Theme from '@/providers/theme-provider';
import { primaryFont } from '@/config/fonts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import AppProvider from '@/providers/AppProvider';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // REVIEW: This allow us to use the session object avoiding loading states. The first load of the layout may be a bit slower, but then the "useSession" hook will be faster. (How is that implemented?)
    const session = await getServerSession(authOptions);

    // TODO: add error boundaries to key components
    // TODO: Should we add a global error file?
    return (
        <html lang='en' className={`${primaryFont.className}`}>
            <SessionProvider session={session!}>
                <AppProvider>
                    <body className={''}>
                        <Theme
                            attribute='class'
                            defaultTheme='light'
                            disableTransitionOnChange
                        >
                            {children}
                        </Theme>
                        <Toaster />
                    </body>
                </AppProvider>
            </SessionProvider>
        </html>
    );
}
