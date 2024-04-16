export const appConfig = {
    routes: {
        /**
         *  Private route prefixes
         */
        private: {
            app: '/app',
        },
        /**
         * This is the prefix for all the auth pages (login, register, etc)
         */
        auth: ['/auth/signin', '/auth/signup'],
        /**
         * This is the prefix for all the auth api routes
         */
        apiRouteAuthPrefix: '/api/auth',
        /**
         * This is the page where the user will be redirected after login
         */
        defaultLogingRedirect: '/app',
    },

    general: {
        appName: 'FlowPost',
        appDomain: 'flowpost.io',
    },

    colors: {
        backgroundLight: '0deg 55% 95%',
        backgroundDark: '0deg 85% 15%',
        primaryLight: 'red',
        primaryDark: 'red',
        lightThemeBackGround: 'red',
        secondaryLight: 'purple',
        secondaryDark: 'purple',
        accentLight: 'orange',
        accentDark: 'orange',
        destructiveLight: 'red',
        destructiveDark: 'red',
        mutedDark: 'grey',
        infoLight: 'yellow',
        infoDark: 'yellow',
    },

    blog: {
        // If you are not going to use the blog, just turn it off by wrapping the directory with parenthesys (blog)
        // That will make the directory "not a route"
        title: 'Las mejores herramientas para buscar trabajo',
        subtitle:
            'Utiliza la tecnología para encontrarlo antes y destacar sobre otros candidatos',
    },

    // ### CUSTOMER SUPPORT
    support: {
        cripsId: 'c597d7de-19fe-48d5-9651-928bc23f3fb8',

        routesWithSupport: ['/'],
    },

    // ### FILE UPLOADS
    uploads: {},

    // ### EMAIL
    email: {
        subdomain: '',

        fromNoReply: 'FlowPost <noreply@flowpost.io>',

        fromAdmin: 'Ricardo de FlowPost <ricardo@mg.flowpost.io>',

        supportEmail: 'ricardo@mg.flowpost.io',

        forwardRepliesTo: 'ricardo@grouz.io',
        testSubdomain: 'sandboxb2328a93eff54cb99ceee2827f1dcd16.mailgun.org',
    },

    // ### AUTH
    auth: {
        authMethods: {
            credentials: false,
            google: true,
            email: true,
        },
    },

    // ### STRINGS
    strings: {
        metas: {
            title: 'FlowPost App',
            description: 'Carruseles y Post en segundos',
        },
        toasts: {
            welcomeToastDescription: 'Continua navegando',
            welcomeToastTitle: `Bienvenido a FlowPost`,
            linkSentToastDescription:
                'Te hemos enviado un link para acceder desde tu correo',
            linkSentToastTitle: `Link Enviado · REVISA TU CORREO 📧`,
        },
    },

    // ### PRODUCTS

    productIds: [
        'prod_PHIj3m00ORtr4K',
        'prod_PHIxsJfB876WpJ',
        'prod_OgYwaGXuY8itev',
    ],

    // ### PLANS
    plans: [
        {
            // featured: false,
            name: 'Anual',
            frequency: 'año',
            credits: 600,
            comparedAtPriceString: '197€',
            priceString: '79€',
            comment: '= 0,13€/crédito (1 crédito = 1 post/carrusel)',
            couponDiscount: '60%',
            couponCode: 'FIRST20',

            couponId: process.env.NODE_ENV === 'production' ? 'dALZx20z' : '',
            // description: 'Basic Plan yo!',
            // price: '$10/month',
            stripePriceId:
                process.env.NODE_ENV === 'production'
                    ? 'price_1P5uF1B6M9fLIRyeqY5ZRGq5'
                    : 'price_1OSkLCB6M9fLIRyeYQAXIGnv',
            // features: [
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            // ],
        },
        {
            name: 'Mensual',
            credits: 50,
            frequency: 'mes',
            comparedAtPriceString: '23€',
            priceString: '17€',
            couponDiscount: '6€',
            couponCode: 'LANZAMIENTO20',
            couponId: process.env.NODE_ENV === 'production' ? 'WMs9qnPb' : '',
            // description: 'Pro Plan yo!',
            // price: '$49/month',
            stripePriceId:
                process.env.NODE_ENV === 'production'
                    ? 'price_1P5uHRB6M9fLIRye5mhV0nTb'
                    : 'price_1OSk7dB6M9fLIRye1TUxFWCl',
            comment: undefined,

            // features: [
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            // ],
        },
        {
            name: 'Trial',
            credits: 3,
            frequency: ' 7 días',
            comparedAtPriceString: '23€',
            priceString: 'GRATIS ',
            couponDiscount: '6€',
            couponCode: 'LANZAMIENTO20',
            // couponId: 'WMs9qnPb',
            // description: 'Pro Plan yo!',
            // price: '$49/month',
            stripePriceId: 'mocked',
            // comment: undefined,

            // features: [
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            //     { name: 'this is a test' },
            // ],
        },
    ],
};
