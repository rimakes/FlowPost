'use client';

import { Session } from 'next-auth';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';

export default function SessionProvider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
    );
}
