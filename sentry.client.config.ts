// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// BOILER: add?

import * as Sentry from '@sentry/nextjs';
import { replayIntegration } from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://a6c25d2bb186b82eed9e8b256435306c@o4506203284701184.ingest.us.sentry.io/4507220849786880',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
        replayIntegration({
            // Additional Replay configuration goes in here, for example:
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
