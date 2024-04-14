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
// BOILER: EDGE CONFIG
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

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    callbacks: {
        async authorized({ req, token }) {
            const isInMaintenanceMode = await get('isMaintenance');
            //     // If in maintenance mode, point the url pathname to the maintenance page
            if (isInMaintenanceMode) {
                return false;
                // Would be ideal be able to redirect to maintenance page instead of returning false...
                // req.nextUrl.pathname = `/maintenance`;
                // return NextResponse.rewrite(req.nextUrl);
            }

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

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
