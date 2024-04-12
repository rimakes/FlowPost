export const metadata = {
    title: 'Reset Password - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Message } from '@/components/auth/message';
import { TPageProps } from '@/types/types';
import { db } from '@/lib/prisma';
import { findCheckoutSession } from '@/lib/stripe';
import { EmailSendMessage } from './EmailSendMessage';

const getUserByCustomerId = async (customerId: string) => {
    const user = await db.user.findFirst({
        where: {
            stripeCustomerId: customerId,
        },
    });

    return user;
};

export default async function ResetPassword({
    params,
    searchParams,
}: TPageProps) {
    const sessionId = searchParams['session_id'] as string;
    const session = await findCheckoutSession(sessionId);

    // const user = await getUserByCustomerId(customerId);

    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />
                        <div className='max-w-md mx-auto w-full px-4 py-8'>
                            <EmailSendMessage
                                email={session!.customer_details?.email!}
                            />
                            <ResetPasswordForm
                                defaultValues={{
                                    email: session!.customer_details?.email!,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}

const session = {
    id: 'cs_test_b1Mzs30C4FnDevHE6fzz476NNMIvISVCc9m0Fq1IXsJDSx2B8pMOIKULea',
    object: 'checkout.session',
    after_expiration: null,
    allow_promotion_codes: true,
    amount_subtotal: 15000,
    amount_total: 15000,
    automatic_tax: { enabled: false, liability: null, status: null },
    billing_address_collection: null,
    cancel_url: 'http://localhost:3000/?canceled=true',
    client_reference_id: null,
    client_secret: null,
    consent: null,
    consent_collection: null,
    created: 1712864282,
    currency: 'eur',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null,
    },
    customer: 'cus_PuI2y7QIVMxXUk',
    customer_creation: 'always',
    customer_details: {
        address: {
            city: null,
            country: 'ES',
            line1: null,
            line2: null,
            postal_code: null,
            state: null,
        },
        email: 'ricardo+test5@grouz.io',
        name: 'RicSala',
        phone: null,
        tax_exempt: 'none',
        tax_ids: [],
    },
    customer_email: null,
    expires_at: 1712950681,
    invoice: 'in_1P4TRzB6M9fLIRye40DxwNSm',
    invoice_creation: null,
    line_items: {
        object: 'list',
        data: [
            {
                id: 'li_1P4TRdB6M9fLIRyewZ77NgxF',
                object: 'item',
                amount_discount: 0,
                amount_subtotal: 15000,
                amount_tax: 0,
                amount_total: 15000,
                currency: 'eur',
                description: 'Pase anual',
                price: {
                    id: 'price_1OSkLCB6M9fLIRyeYQAXIGnv',
                    object: 'price',
                    active: true,
                    billing_scheme: 'per_unit',
                    created: 1703872766,
                    currency: 'eur',
                    custom_unit_amount: null,
                    livemode: false,
                    lookup_key: null,
                    metadata: {},
                    nickname: null,
                    product: 'prod_PHIxsJfB876WpJ',
                    recurring: {
                        aggregate_usage: null,
                        interval: 'year',
                        interval_count: 1,
                        trial_period_days: null,
                        usage_type: 'licensed',
                    },
                    tax_behavior: 'unspecified',
                    tiers_mode: null,
                    transform_quantity: null,
                    type: 'recurring',
                    unit_amount: 15000,
                    unit_amount_decimal: '15000',
                },
                quantity: 1,
            },
        ],
        has_more: false,
        url: '/v1/checkout/sessions/cs_test_b1Mzs30C4FnDevHE6fzz476NNMIvISVCc9m0Fq1IXsJDSx2B8pMOIKULea/line_items',
    },
    livemode: false,
    locale: null,
    metadata: {},
    mode: 'subscription',
    payment_intent: null,
    payment_link: null,
    payment_method_collection: 'always',
    payment_method_configuration_details: {
        id: 'pmc_1Mt4VfB6M9fLIRyePVJwp8aH',
        parent: null,
    },
    payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    payment_method_types: ['card'],
    payment_status: 'paid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: null,
    subscription: 'sub_1P4TRzB6M9fLIRyeWKCRgRx9',
    success_url:
        'http://localhost:3000/auth/payment-done?success=true&priceId=price_1OSkLCB6M9fLIRyeYQAXIGnv&session_id={CHECKOUT_SESSION_ID}',
    tax_id_collection: { enabled: true },
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'hosted',
    url: null,
};
