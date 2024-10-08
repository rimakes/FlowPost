import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { Brand, Subscription } from '@prisma/client';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context (this last part?)
     */
    export interface Session {
        user: {
            // role: string;
            id: string;
            settingsId: string;
            hasAccountLinked: boolean;
            brands: Brand[];
            stripeSubscription: Subscription | null;
            creditBalance: number;
        } & DefaultSession['user'];
    }
    // Popular interfaces to augment

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User extends DefaultUser {
        // role: string;
        // id: string;
    }
    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    interface Account {}
    /** The OAuth profile returned from your provider */
    interface Profile {}
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        // role: string;
        id: string;
        settingsId: string;
        hasAccountLinked: boolean;
        stripeSubscription: Subscription | null;
        brands: Brand[];
        creditBalance: number;
        settingsId: string;
        stripeSubscription: Subscription | null;
        creditBalance: number;
    }
}
