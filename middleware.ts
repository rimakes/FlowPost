// import { NextResponse } from 'next/server';
// import { get } from '@vercel/edge-config';

// export const config = { matcher: '/' };

// export async function middleware() {
//     const isMaintenance = await get('isMaintenance');
//     console.log({ isMaintenance });
//     return NextResponse.json(isMaintenance);
// }

import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

// export async function middleware(req: NextRequest) {
//     // Check Edge Config to see if the maintenance page should be shown
//     const isInMaintenanceMode = await get('isMaintenance');
//     console.log({ isInMaintenanceMode });

//     // If in maintenance mode, point the url pathname to the maintenance page
//     if (isInMaintenanceMode) {
//         req.nextUrl.pathname = `/maintenance`;

//         // Rewrite to the url
//         return NextResponse.rewrite(req.nextUrl);
//     }
// }

export const authMiddleware = withAuth({
    // Matches the pages config in `[...nextauth]`
    callbacks: {
        async authorized({ req, token }) {
            if (!req.nextUrl.pathname.startsWith('/app')) return true;
            if (token) {
                return true;
            } else return false;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});

export default async function middleware(request: NextRequest) {
    const isInMaintenanceMode = await get('isMaintenance');
    //     // If in maintenance mode, point the url pathname to the maintenance page
    if (isInMaintenanceMode) {
        // Would be ideal be able to redirect to maintenance page instead of returning false...
        request.nextUrl.pathname = `/maintenance`;
        return NextResponse.rewrite(request.nextUrl);
    }

    // Check if the request is coming from a callback
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    const error = request.nextUrl.searchParams.get('error');
    if (
        // Check if the callbackUrl is a valid URL
        callbackUrl?.startsWith('http') &&
        // We are gonna check case by case if the callbackUrl should be redirected
        // TODO: need to find a better way to do this
        callbackUrl?.includes('schedule')
        // ||
        // Other pages that should be redirected
        // callbackUrl?.includes('/app/availability')
    ) {
        return NextResponse.redirect(
            `${new URL(callbackUrl)}${error ? `?error=${error}` : ''}`
        );
    }
    return (authMiddleware as any)(request);
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
