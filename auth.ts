// don't check eslint in this file
/* eslint-disable */

import console from 'console';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import LinkedInProvider from 'next-auth/providers/linkedin';
import {
    NextAuthOptions,
    getServerSession as getAuthServerSession,
} from 'next-auth';

import bcrypt from 'bcryptjs';
import { render } from '@react-email/render';
import { appConfig } from './config/shipper.appconfig';
import { sendEmail } from './lib/mailgun';
import { ReactSigninEmail } from './emails/ReactSigninEmail';
import { db } from './lib/prisma';
import {
    getFirstUserAccount,
    getUserByEmail,
} from '@/app/_actions/user-actions';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            async profile(profile, tokens) {
                const newSettings = await db.settings.create({
                    data: {},
                });
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    settingsId: newSettings.id,
                };
            },
        }),

        // LinkedIn recently changed their OAuth flow which is why there is a bit extra code
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
            client: { token_endpoint_auth_method: 'client_secret_post' }, // default to client_secret_basic
            // scope: 'r_liteprofile r_emailaddress',
            issuer: 'https://www.linkedin.com',
            /**
             * When using an OAuth 2 provider, the user information must be requested
             * through an additional request from the userinfo endpoint.
             *
             * [Userinfo endpoint](https://www.oauth.com/oauth2-servers/signing-in-with-google/verifying-the-user-info)
             */
            userinfo: {
                url: 'https://api.linkedin.com/v2/userinfo',
            },
            // tokenUri: 'https://www.linkedin.com/oauth/v2/accessToken',
            wellKnown:
                'https://www.linkedin.com/oauth/.well-known/openid-configuration',
            authorization: {
                url: 'https://www.linkedin.com/oauth/v2/authorization',
                params: {
                    scope: 'profile email openid w_member_social',
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },

            token: {
                url: 'https://www.linkedin.com/oauth/v2/accessToken',
            },
            jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
            async profile(profile) {
                // console.log('profile:-', profile);
                const newSettings = await db.settings.create({
                    data: {},
                });

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    settingsId: newSettings.id,
                };
            },
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: ' ' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                const user = await getUserByEmail(credentials.email);

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                //REVIEW: does this mean we are gonna have the whole user object in the session?
                //  --> No, we are only gonna have name, email, image and whatever we add in the session callback
                // This is handle by next-auth to avoid leaking sensitive information
                return user;
            },
        }),

        EmailProvider({
            // REVIEW: Not sure what are we using here: we are providing smtp details but then we are sending the email using mailguns api
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: appConfig.email.fromNoReply,
            async sendVerificationRequest(params) {
                const {
                    identifier: email,
                    url,
                    token,
                    provider,
                    theme,
                } = params;
                const { host } = new URL(url);
                console.log(params);

                const emailHtml = render(ReactSigninEmail({ email, url }));

                await sendEmail(
                    email,
                    `Entra en ${appConfig.general.appName}`,
                    `Entra en ${appConfig.general.appName}`,
                    emailHtml,
                    'noreply@test.com'
                );
            },
        }),
    ],

    // custom pages
    pages: {
        signIn: '/auth/signin',
        newUser: '/app', // New users will be directed here on first sign in
        error: '/',
    },

    debug: process.env.NODE_ENV === 'development', // Set to true to display debug messages
    jwt: {
        // secret: process.env.JWT_SECRET, // deprecated
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        //   maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        //   async encode() {},
        //   async decode() {},
    },

    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    session: {
        maxAge: 30 * 24 * 60 * 60, // How long until the session expires in seconds
        strategy: 'jwt',
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens (as is the case)
        // updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        //   generateSessionToken: () => {
        //     return randomUUID?.() ?? randomBytes(32).toString("hex")
        //   }
    },

    callbacks: {
        // to control if a user is allowed to sign in.
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider !== 'email') return true;

            // We limit magic links to users that already exist in the database (no signups)
            const userExists = await db.user.findUnique({
                where: { email: user.email! },
            });
            if (userExists) {
                return true; //if the email exists in the User collection, email them a magic login link
            } else {
                return false;
            }
        },

        // called anytime the user is redirected to a callback URL (e.g. on signin or signout).
        // This is the default.
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            // console.log('url-->', url);
            // console.log('baseUrl-->', baseUrl);
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },

        // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or
        // updated (i.e whenever a session is accessed?? or updated?? in the client). The returned value will be encrypted,
        // and it is stored in a cookie.
        // The arguments user, account, profile and -isNewUser- (deprecated, use trigger instead) are only passed the first time this callback is called on a new session, after the user signs in. In subsequent calls, only token will be available.
        // whatever this callback returns will be the token that is stored in the cookie.
        async jwt({ token, user, account, profile, session, trigger }) {
            // console.log({ token });
            // console.log({ user });
            // console.log({ account });
            // console.log({ profile });
            // console.log({ session });
            // console.log('trigger-->', { trigger });

            // These are the session values that I want to be able to update from the client (so I need to add them to the token)
            if (trigger === 'update') {
                session.name && (token.name = session.name);
                session.brands && (token.brands = session.brands);
                session.stripeSubscription &&
                    (token.stripeSubscription = session.stripeSubscription);
                session.creditBalance &&
                    (token.creditBalance = session.creditBalance);
            }

            // When the user signs in for the first time, we want to add some extra information to the token
            if (user) {
                const dbUser = await db.user.findUnique({
                    where: { id: user.id },
                });

                const linkedinAccountLinked = !!(await getFirstUserAccount(
                    user.id
                ));

                const brandsOfUser = await db.brand.findMany({
                    where: {
                        authorId: user.id,
                    },
                });

                token.hasAccountLinked = linkedinAccountLinked;
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.settingsId = dbUser?.settingsId!;
                token.brands = brandsOfUser;
                token.stripeSubscription = dbUser?.stripeSubscription!;
                token.creditBalance = dbUser?.creditBalance!;
            }

            return token;
        },

        // The session callback is called whenever a session is checked.
        // By default, only a subset of the token is returned for increased security.
        // If you want to make something available you added to the token (like access_token and user.id from above)
        // via the jwt() callback, you have to explicitly forward it here to make it available to the client.
        // When using database sessions, the User (user) object is passed as an argument.
        // When using JSON Web Tokens for sessions, the JWT payload (token) is provided instead.
        async session({ session, token, user }) {
            // console.log('token from session callback', { token });
            if (session && session.user) {
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    id: token.id,
                    role: token.role,
                    settingsId: token.settingsId,
                    hasAccountLinked: token.hasAccountLinked,
                    brands: token.brands,
                    stripeSubscription: token.stripeSubscription,
                    creditBalance: token.creditBalance,
                },
            };
        },
    },

    events: {
        async createUser({ user }) {
            // console.log('User created EVENT', user);
        },
        async linkAccount(message) {
            // console.log('Account linked EVENT', message);
        },
        async signIn(message) {
            // console.log('Sign in EVENT', message);
        },
    },

    // We also have "events"
    // what's the difference between callbacks and events?
    // callbacks modify the default behavior, events can be used to add on top of the default behavior
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },

    // https://dev.to/mfts/how-to-send-a-warm-welcome-email-with-resend-next-auth-and-react-email-576f
    // events: {
    //     async createUser(message) {
    //       const params = {
    //         user: {
    //           name: message.user.name,
    //           email: message.user.email,
    //         },
    //       };
    //       await sendWelcomeEmail(params); // <-- send welcome email
    //     }
    //   },

    //REVIEW: When you supply a session prop in _app.js, useSession won't show a loading state, but...will the session be updated?
    // as it'll already have the session available. In this way, you can provide a more seamless user experience.
    // https://next-auth.js.org/tutorials/securing-pages-and-api-routes
} satisfies NextAuthOptions;

// Get the custom AISettings from the user
export const getServerSession = async () => {
    const session = await getAuthServerSession(authOptions);
    return session;
};
