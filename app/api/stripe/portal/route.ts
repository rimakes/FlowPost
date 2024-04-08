import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { createCustomerPortal } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (session) {
        try {
            const body = await request.json();

            const { id } = session.user;

            const user = await db.user.findUnique({
                where: { id },
            });

            if (!user?.stripeCustomerId) {
                return NextResponse.json(
                    {
                        error: "You don't have a billing account yet. Make a purchase first.",
                    },
                    { status: 400 }
                );
            } else if (!body.returnUrl) {
                return NextResponse.json(
                    { error: 'Return URL is required' },
                    { status: 400 }
                );
            }

            const stripePortalUrl = await createCustomerPortal({
                customerId: user.stripeCustomerId,
                returnUrl: body.returnUrl,
            });

            return NextResponse.json({
                url: stripePortalUrl,
            });
        } catch (e: any) {
            const error: Error = e;
            console.error(e);
            return NextResponse.json({ error: e?.message }, { status: 500 });
        }
    } else {
        // Not Signed in
        return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }
}
