import Container from '@/components/shared/container';

type LayoutProps = {
    children: React.ReactNode;
};
export default function WritterLayout({ children }: LayoutProps) {
    return (
        <Container className={'flex grow flex-col border-0 border-dashed'}>
            {children}
        </Container>
    );
}
