import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { createCheckout } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card
export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.priceId) {
        return NextResponse.json(
            { error: 'Price ID is required' },
            { status: 400 }
        );
    } else if (!body.successUrl || !body.cancelUrl) {
        return NextResponse.json(
            { error: 'Success and cancel URLs are required' },
            { status: 400 }
        );
    } else if (!body.mode) {
        return NextResponse.json(
            {
                error: "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
            },
            { status: 400 }
        );
    }

    try {
        const session = await getServerSession(authOptions);

        const user = await db.user.findUnique({
            where: { id: session?.user?.id },
        });

        console.log('user from stripe api', user);

        const { priceId, mode, successUrl, cancelUrl, couponId } = body;

        const stripeSessionURL = await createCheckout({
            priceId,
            mode,
            successUrl,
            cancelUrl,
            // If user is logged in, it will pass the user ID to the Stripe Session so it can be retrieved in the webhook later
            clientReferenceId: user?.id,
            // If user is logged in, this will automatically prefill Checkout data like email and/or credit card for faster checkout
            user: {
                customerId: user?.stripeCustomerId!,
                email: user?.email!,
            },
            // If you send coupons from the frontend, you can pass it here
            couponId,
        });

        return NextResponse.json({ url: stripeSessionURL });
    } catch (e: any) {
        const error: Error = e; // Here we're asserting that e is of type Error

        console.error(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
