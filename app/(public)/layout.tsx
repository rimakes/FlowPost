import Footer from '@/components/shared/Footer';
import Container from '@/components/shared/container';
import { HomeNavbar } from '@/components/shared/navbar/HomeNavbar';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden'>
            {/* Sidebar */}
            {/* <Sidebar /> */}

            {/* Content area */}
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden scroll-smooth'>
                {/*  Site header */}
                <HomeNavbar />
                {/* [&>*:first-child]:scroll-mt-16 */}
                <main className='gap flex flex-1 flex-col bg-background bg-pattern py-12'>
                    <Container className={''}>{children}</Container>
                </main>
                <Footer />
            </div>
        </div>
    );
}
