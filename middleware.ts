import { withAuth } from 'next-auth/middleware';

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});

export const config = { matcher: ['/app', '/app/:path*'] };
