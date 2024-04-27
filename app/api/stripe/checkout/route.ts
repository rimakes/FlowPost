import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { createCheckout } from '@/lib/stripe';
import { withMiddleware } from '@/app/api/(middleware)/with-middleware';
import { withCatch } from '@/app/api/(middleware)/with-catch';

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card
async function postHandler(req: NextRequest) {
    const body = await req.json();

    validateBody(body);

    const session = await getServerSession(authOptions);
    let user;
    if (session?.user?.id) {
        user = await db.user.findUnique({
            where: { id: session?.user?.id },
        });
    }

    const { priceId, mode, successUrl, cancelUrl, couponId } = body;

    const stripeSessionURL = await createCheckout({
        priceId,
        mode,
        successUrl,
        cancelUrl,
        clientReferenceId: user?.id, // so we can link the Stripe Checkout Session to the user
        user: {
            // prefill the Checkout data
            customerId: user?.stripeCustomerId!,
            email: user?.email!,
        },
        couponId,
    });

    return NextResponse.json({ url: stripeSessionURL });
}

export const POST = withMiddleware(withCatch, postHandler);

const validateBody = (body: any) => {
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
};
