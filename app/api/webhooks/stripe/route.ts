import { headers } from 'next/headers';
import Stripe from 'stripe';
import { findCheckoutSession, stripe } from '@/lib/stripe';
import { appConfig } from '@/config/shipper.appconfig';
import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();

    const signature = headers().get('Stripe-Signature') as string;

    let data;
    let eventType;
    let event: Stripe.Event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        const error: Error = err;
        console.error(
            `Webhook signature verification failed. ${error.message}`
        );
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    // @ts-ignore
    const session = await findCheckoutSession(data.object.id);

    try {
        switch (eventType) {
            case StripeWebhooks.Completed: {
                const sessionId = session?.id;

                const customerId = session?.customer;
                const priceId = session?.line_items?.data[0]?.price!.id;
                const userId = session?.client_reference_id;
                const productId = session?.line_items?.data[0]?.price!
                    .product as string;

                const userEmail = session?.customer_details?.email;
                const userName = session?.customer_details?.name;
                const subscription = await stripe.subscriptions.retrieve(
                    session?.subscription as string
                );
                const subscriptionId = subscription.id;
                const currentPeriodEnd = new Date(
                    subscription.current_period_end * 1000
                );

                // With this, we can make sure is one of the products we're selling in this app
                const plan = appConfig.plans.find(
                    (p) => p.stripePriceId === priceId
                );

                console.log('session', session);
                console.log('priceId', priceId);
                console.log('plan', plan);
                console.log('customerId', customerId);

                if (!customerId) break;

                const customer = await stripe.customers.retrieve(
                    customerId.toString()
                );

                console.log('customer', customer);

                let user;

                // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
                console.log('retrieving or creating user');
                if (userId) {
                    // If we passed a userId from the client, we can use it to find the user in our db
                    user = await db.user.findUnique({ where: { id: userId } });
                    // @ts-ignore
                } else if (customer.email) {
                    // @ts-ignore
                    console.log('searching user by email', customer.email);
                    // otherwise, we can use the email to find the user
                    user = await db.user.findUnique({
                        // @ts-ignore
                        where: { email: customer.email },
                    });

                    // or create a new user if it doesn't exist
                    if (!user) {
                        console.log(
                            'creating new user with email: ',
                            // @ts-ignore
                            customer.email
                        );
                        user = await db.user.create({
                            data: {
                                // @ts-ignore
                                email: customer.email,
                                // @ts-ignore
                                name: customer.name,
                                settings: {
                                    create: {},
                                },
                            },
                        });
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }

                // Update user data + Grant user access to your product.
                const updatedUser = await db.user.update({
                    where: { id: user!.id },
                    data: {
                        stripeCustomerId: customerId.toString(),
                        stripeSubscription: {
                            subscriptionId,
                            priceId,
                            currentPeriodEnd,
                            productId,
                        },
                    },
                });

                // Extra: send email with user link, product page, etc...
                // try {
                //   await sendEmail({to: ...});
                // } catch (e) {
                //   console.error("Email issue:" + e?.message);
                // }

                break;
            }

            case StripeWebhooks.PaymentSuccess: {
                const subscription = await stripe.subscriptions.retrieve(
                    // @ts-ignore
                    session.subscription as string
                );
                const stripeCustomerId = subscription.customer.toString();
                const priceId = subscription.items.data[0].price.id;
                const currentPeriodEnd = new Date(
                    subscription.current_period_end * 1000
                );
                await db.user.updateMany({
                    where: {
                        stripeCustomerId,
                    },
                    data: {
                        stripeSubscription: {
                            priceId,
                            currentPeriodEnd,
                        },
                    },
                });
            }

            case StripeWebhooks.SessionExpired: {
                // User didn't complete the transaction
                // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
                break;
            }

            case StripeWebhooks.SubscriptionUpdated: {
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
                // You can update the user data to show a "Cancel soon" badge for instance
                break;
            }

            case StripeWebhooks.SubscriptionDeleted: {
                // The customer subscription stopped
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                // const subscription = await stripe.subscriptions.retrieve(
                //     data.object.id
                // );
                // TODO: Update user data
                // const user = await db.user.updateMany({
                //     where: { customerId: subscription.customer.toString() },
                //     data: {

                //     }
                // });

                // Revoke access to your product

                break;
            }

            case 'invoice.paid': {
                // Customer just paid an invoice (for instance, a recurring payment for a subscription)
                // ✅ Grant access to the product
                // const priceId = data.object.lines.data[0].price.id;
                // const customerId = data.object.customer;

                // const user = await User.findOne({ customerId });

                // // Make sure the invoice is for the same plan (priceId) the user subscribed to
                // if (user.priceId !== priceId) break;

                // // Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                // user.hasAccess = true;
                // await user.save();

                break;
            }

            case 'invoice.payment_failed':
                // A payment failed (for instance the customer does not have a valid payment method)
                // ❌ Revoke access to the product
                // ⏳ OR wait for the customer to pay (more friendly):
                //      - Stripe will automatically email the customer (Smart Retries)
                //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

                break;

            default:
            // Unhandled event type
        }
    } catch (e: any) {
        const error: Error = e;
        console.error(
            'stripe error: ' + error.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}

enum StripeWebhooks {
    PaymentSuccess = 'checkout.session.async_payment_succeeded',
    AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
    Completed = 'checkout.session.completed',
    PaymentFailed = 'checkout.session.async_payment_failed',
    SubscriptionDeleted = 'customer.subscription.deleted',
    SubscriptionUpdated = 'customer.subscription.updated',
    SessionExpired = 'checkout.session.expired',
}

// STRIPE EVENTS
// https://stripe.com/docs/api/events/types
// payment_method.attached
// customer.created
// customer.updated
// customer.subscription.created
// customer.subscription.updated
// payment_intent.succeeded
// payment_intent.created
// invoice.created
// invoice.finalized
// invoice.updated
// invoice.paid
// invoice.payment_succeeded
// checkout.session.completed
