'use client';

import { ToolBanner } from '../layout';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
