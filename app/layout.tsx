import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/providers/session-provider';
import { Toaster } from '@/components/ui/sonner';
import Theme from '@/providers/theme-provider';
import { primaryFont } from '@/config/fonts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { AppProvider } from '@/providers/AppProvider';
import { appConfig } from '@/config/shipper.appconfig';

// BOILER: ADD
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
    title: `${appConfig.general.appName} · Crea Carousel y Post de Linkedin en Segundos`,
    description: `Carrusels y Post Únicos, adaptados a tu estilo y marca · Escribe con IA · Programa tus publicaciones · Crea contenido en segundos · Prueba Gratis`,
    metadataBase: new URL(`https://${appConfig.general.appDomain}`),
    openGraph: {
        title: `${appConfig.general.appName} · Crea Carousel y Post de Linkedin en Segundos`,
        description: `Carrusels y Post Únicos, adaptados a tu estilo y marca · Escribe con IA · Programa tus publicaciones · Crea contenido en segundos · Prueba Gratis`,
        type: 'website',
        locale: 'es',
        url: appConfig.general.appDomain,
        siteName: `${appConfig.general.appName}`,
        images: [
            {
                url: 'https://mms.businesswire.com/media/20211123005573/en/929867/23/vercel-logo-freelogovectors.net.jpg',
                width: 1200,
                height: 630,
                alt: `${appConfig.general.appName} · Crea Carousel y Post de Linkedin en Segundos`,
            },
        ],
    },
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
                <body className={''}>
                    <Theme
                        attribute='class'
                        defaultTheme='light'
                        disableTransitionOnChange
                    >
                        <AppProvider>{children}</AppProvider>
                    </Theme>
                    <Toaster />
                </body>
            </SessionProvider>
        </html>
    );
}
