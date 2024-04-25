/* eslint-disable */
namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_HOSTNAME: string;
        MONGO_URL: string;
        NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
        NEXT_PUBLIC_GTM: string;
        NEXTAUTH_URL: string;
        JWT_SECRET_SEED: string;
        NEXTAUTH_SECRET: string;
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
        MAILGUN_API_KEY: string;
        EMAIL_SERVER: string;
        MG_PASSWORD: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USER: string;
        SMTP_PASSWORD: string;
        OPENAI_API_KEY: string;
        LANGCHAIN_TRACING_V2: string;
        LANGCHAIN_CALLBACKS_BACKGROUND: string;
        LANGCHAIN_API_KEY: string;
        LANGCHAIN_ENDPOINT: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        LINKEDIN_CLIENT_ID: string;
        LINKEDIN_CLIENT_SECRET: string;
        LINKEDIN_POST_URL: string;
        LINKEDIN_ACCESS_TOKEN: string;
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
        STRIPE_WEBHOOK_SECRET: string;
        NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL: string;
        NEXT_PUBLIC_PEXELS_API_KEY: string;
        NEXT_PUBLIC_SEARCH_ENGINE_ID: string;
        NEXT_PUBLIC_SEARCH_API_KEY: string;
        EDGE_CONFIG: string;
        DEMO_USER_ID: string;
    }
}

// BOILER: Add to boilerplate so env variables are typed
// BOILER: Install husky ? and lint-staged?
// BOILER: Add husky to package.json
// BOILER: Add .prettierrrc.json with configuration
