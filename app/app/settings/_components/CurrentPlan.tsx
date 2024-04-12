'use client';

import { AccountButton } from '@/components/marketing/AccountButton';
import { appConfig } from '@/config/shipper.appconfig';
import { Subscription } from '@prisma/client';
import { formatDate } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SettingsSectionHeader } from './SettingsSectionHeader';
import { SecondStep } from '@/components/marketing/GetAccessButton';

type CurrentPlanProps = {
    subscription: Subscription | null | undefined;
};

// REVIEW: There must be a better way to handle this...

export function CurrentPlan({ subscription }: CurrentPlanProps) {
    const plan = appConfig.plans.find(
        (plan) => plan.stripePriceId === subscription?.priceId
    );
    const renewalDate = subscription?.currentPeriodEnd!;

    return (
        <div>
            <SettingsSectionHeader
                title='Plan actual'
                subtitle='Cambia o gestiona tu plan de suscripción u obtén tus facturas'
                className='mb-8'
            />
            {subscription ? (
                <div className='border border-border rounded-lg p-3 max-w-md'>
                    <div>
                        <p className='mb-6'>
                            Tu plan actual es{' '}
                            <span className='font-semibold'>
                                {appConfig.general.appName} {plan?.name}
                            </span>
                        </p>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm text-primary/70'>
                                Se renovará el{' '}
                                {new Date(renewalDate).toLocaleDateString(
                                    'es-ES',
                                    {
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                            </p>
                            <AccountButton variant={'secondary'} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='max-w-md'>
                    <SecondStep />
                </div>
            )}
        </div>
    );
}
