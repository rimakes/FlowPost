import { authMiddlewareOptions } from './auth.middleware.config';
import NextAuth from 'next-auth';
import { config as appConfig } from './config/shipper.config';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});

export const config = { matcher: ['/app', '/app/:path*'] };
