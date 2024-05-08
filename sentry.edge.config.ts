import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://a6c25d2bb186b82eed9e8b256435306c@o4506203284701184.ingest.us.sentry.io/4507220849786880',

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // ...

    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
