import Stripe from 'stripe';

type CreateCheckoutParams = {
    user?: {
        customerId?: string;
        email?: string;
    };
    clientReferenceId?: string;
    successUrl: string;
    cancelUrl: string;
    priceId: string;
    couponId?: string;
    mode?: 'payment' | 'subscription';
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
});

// This is used to create a Stripe Checkout for one-time payments. It's usually triggered with the <ButtonCheckout /> component. Webhooks are used to update the user's state in the database.
export const createCheckout = async ({
    priceId,
    mode,
    successUrl,
    cancelUrl,
    couponId,
    clientReferenceId,
    user,
}: CreateCheckoutParams) => {
    const extraParams = {} as any;

    if (user?.customerId) {
        extraParams.customer = user.customerId;
    } else {
        if (mode === 'payment') {
            extraParams.customer_creation = 'always';
            // The option below costs 0.4% (up to $2) per invoice. Alternatively, you can use https://zenvoice.io/ to create unlimited invoices automatically.
            // extraParams.invoice_creation = { enabled: true };
            extraParams.payment_intent_data = {
                setup_future_usage: 'on_session',
            };
        }
        if (user?.email) {
            extraParams.customer_email = user.email;
        }
        extraParams.tax_id_collection = { enabled: true };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode,
        allow_promotion_codes: true,
        client_reference_id: clientReferenceId,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        discounts: couponId
            ? [
                  {
                      coupon: couponId,
                  },
              ]
            : [],
        success_url: successUrl,
        cancel_url: cancelUrl,
        ...extraParams,
    });

    return stripeSession.url;
};

type CreateCustomerPortalParams = {
    customerId: string;
    returnUrl: string;
};

// This is used to create Customer Portal sessions, so users can manage their subscriptions (payment methods, cancel, etc..)
export const createCustomerPortal = async ({
    customerId,
    returnUrl,
}: CreateCustomerPortalParams) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });

        return portalSession.url;
    } catch (e) {
        console.error(e);
        return null;
    }
};

// This is used to get the uesr checkout session and populate the data so we get the planId the user subscribed to
export const findCheckoutSession = async (sessionId: string) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'],
        });

        return session;
    } catch (e) {
        console.error('ERROR FINDCHECKOIUTSESSION FN - ', e);
        return null;
    }
};

export async function getStripeInstance() {
    return stripe;
}

// import Stripe from 'stripe';

// // TODO: implement singleton?
// export async function getStripeInstance() {
//     const key = process.env.STRIPE_SECRET_KEY!;

//     return new Stripe(key);
// }

// type CreateCheckoutParams = {
//     user?: {
//         customerId?: string;
//         email?: string;
//     };
//     clientReferenceID: string;
//     successUrl: string;
//     cancelUrl: string;
//     priceId: string;
//     couponId?: string;
//     mode?: 'payment' | 'subscription';
// };

// type UserParams = any;

// export const createCheckout = async ({
//     user,
//     clientReferenceID,
//     successUrl,
//     cancelUrl,
//     priceId,
//     couponId,
//     mode = 'payment',
// }: CreateCheckoutParams) => {
//     const stripe = await getStripeInstance();

//     const userParams: UserParams = {};

//     if (user?.customerId) {
//         userParams.customer = user.customerId;
//     } else {
//         userParams.customer_creation = 'always';

//         if (user?.email) {
//             userParams.customer_email = user.email;
//         }
//     }

//     const stripeSession = await stripe.checkout.sessions.create({
//         mode,
//         ...userParams,
//         allow_promotion_codes: true,
//         invoice_creation: { enabled: true },
//         client_reference_id: clientReferenceID,
//         payment_intent_data: { setup_future_usage: 'on_session' },
//         line_items: [
//             {
//                 price: priceId,
//                 quantity: 1,
//             },
//         ],
//         discounts: couponId
//             ? [
//                   {
//                       coupon: couponId,
//                   },
//               ]
//             : [],
//         success_url: successUrl,
//         cancel_url: cancelUrl,
//     });

//     return stripeSession.url;
// };
