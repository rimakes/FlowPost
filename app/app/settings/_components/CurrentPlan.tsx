'use client';

import { appConfig } from '@/config/shipper.appconfig';
import { Subscription } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

type CurrentPlanProps = {
    subscription: Subscription | null | undefined;
};

// REVIEW: There must be a better way to handle this...

export function CurrentPlan({ subscription }: CurrentPlanProps) {
    const productName = appConfig.plans.find(
        (plan) => plan.stripePriceId === subscription?.priceId
    );
    const renewalDate = subscription?.currentPeriodEnd!;

    return (
        <div>
            <h2>Current Plan</h2>
            {subscription ? (
                <div>
                    <p>Plan: {JSON.stringify(productName)}</p>
                    <p>Renews on: {JSON.stringify(renewalDate)}</p>
                </div>
            ) : (
                <p>No active subscription</p>
            )}
        </div>
    );
}
