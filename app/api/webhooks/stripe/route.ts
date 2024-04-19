import { headers } from 'next/headers';
import Stripe from 'stripe';
import { findCheckoutSession, stripe } from '@/lib/stripe';
import { appConfig } from '@/config/shipper.appconfig';
import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { getCreditsByPriceId } from '@/lib/utils';
import { Prisma } from '@prisma/client';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();

    const signature = headers().get('Stripe-Signature') as string;

    // REVIEW:
    // Stripe send a post request with the event data in the body and a signature in the header
    // We need to verify that the signature is legit and has not been tampered with
    // The header has this format: t=1629780000,v1=8e3....d7
    // We need to compare that signature with the one we would get using the webhook secret
    // For that we take the timestamp and the body and we create a signature with the webhook secret and compare it with the one we got in the header. If they match, the event is legit
    // We could do it manually, but Stripe has a method to do it for us: stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // let data: Stripe.Event.Data;
    // let eventType: Stripe.Event.Type;
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

    // console.log('event type', event.type);
    // console.log('event id ', event.id);
    // console.log('event live mode', event.livemode);

    try {
        switch (event.type) {
            case 'customer.created': {
                let {
                    data: { object: checkoutSession },
                } = event;

                break;
            }
            case 'checkout.session.completed': {
                let {
                    data: { object: checkoutSession },
                } = event;

                let priceId = checkoutSession.line_items?.data[0]?.price!.id;
                let productId = checkoutSession.line_items?.data[0]?.price?.id;

                if (checkoutSession.mode === 'subscription') {
                    const subscription = await stripe.subscriptions.retrieve(
                        checkoutSession.subscription!.toString()
                    );

                    priceId = subscription.items.data[0].price.id.toString();
                    productId =
                        subscription.items.data[0].price.product.toString();
                }

                if (!priceId) {
                    console.error('No priceId found');
                    throw new Error('No priceId found');
                }

                if (!productId) {
                    console.error('No productId found');
                    throw new Error('No productId found');
                }

                const customerId = checkoutSession.customer;
                const clientReferenceId = checkoutSession.client_reference_id;
                const userEmail = checkoutSession.customer_details?.email;
                const userName = checkoutSession.customer_details?.name;
                // const subscriptionId = subscription.id;
                const subscriptionId = checkoutSession.subscription?.toString();
                const subscription = await stripe.subscriptions.retrieve(
                    subscriptionId!
                );

                const currentPeriodEnd = new Date(
                    subscription.current_period_end * 1000
                );

                // With this, we can make sure is one of the products we're selling in this app
                const plan = appConfig.plans.find(
                    (p) => p.stripePriceId === priceId
                );

                // console.log('session', checkoutSession);
                // console.log('priceId', priceId);
                // console.log('plan', plan);
                // console.log('customerId', customerId);

                if (!customerId) break;

                let user;

                // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
                console.log('retrieving or creating user');
                if (clientReferenceId) {
                    // If we passed a userId from the client, we can use it to find the user in our db
                    user = await db.user.findUnique({
                        where: { id: clientReferenceId },
                    });
                    // @ts-ignore
                } else if (userEmail) {
                    // @ts-ignore
                    console.log('searching user by email', userEmail);
                    // otherwise, we can use the email to find the user
                    user = await db.user.findUnique({
                        // @ts-ignore
                        where: { email: userEmail },
                    });

                    // or create a new user if it doesn't exist
                    if (!user) {
                        console.log(
                            'creating new user with email: ',
                            // @ts-ignore
                            userEmail
                        );
                        user = await db.user.create({
                            data: {
                                email: userEmail,
                                name: userName,
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

                const updateUserInput: Prisma.UserUpdateInput = {
                    stripeCustomerId: customerId.toString(),
                    stripeSubscription: {
                        subscriptionId,
                        priceId,
                        currentPeriodEnd,
                        productId,
                    },
                    creditBalance: getCreditsByPriceId(priceId),
                };
                console.log('updating user checkout', updateUserInput);

                // Update user data + Grant user access to your product.
                await db.user.update({
                    where: { id: user!.id },
                    data: updateUserInput,
                });

                // Extra: send email with user link, product page, etc...
                // try {
                //   await sendEmail({to: ...});
                // } catch (e) {
                //   console.error("Email issue:" + e?.message);
                // }

                break;
            }

            case 'checkout.session.async_payment_succeeded': {
            }

            case 'checkout.session.expired': {
                // User didn't complete the transaction
                // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
                break;
            }

            case 'customer.subscription.updated': {
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
                // You can update the user data to show a "Cancel soon" badge for instance
                break;
            }

            case 'customer.subscription.deleted': {
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
                let {
                    data: { object: invoice },
                } = event;
                const stripeCustomerId = invoice.customer?.toString();
                const priceId = invoice.lines.data[0].price?.id.toString()!;
                const currentPeriodEnd = new Date(
                    invoice.lines.data[0].period.end * 1000
                );

                const useUpdateManyInput: Prisma.UserUpdateManyMutationInput = {
                    stripeSubscription: {
                        priceId,
                        currentPeriodEnd,
                    },
                    creditBalance: getCreditsByPriceId(priceId),
                };

                console.log('updating user paid', useUpdateManyInput);

                await db.user.updateMany({
                    where: {
                        stripeCustomerId,
                    },
                    data: useUpdateManyInput,
                });

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
            'stripe error: ' + error.message + ' | EVENT TYPE: ' + event.type
        );
    }

    return NextResponse.json({});
}
