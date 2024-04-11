import { Pricing } from '@/components/marketing/pricing';
import { Subscription } from '@prisma/client';
import { CurrentPlan } from './CurrentPlan';

type PlanSettingsProps = {
    subscription: Subscription | null | undefined;
};
export function PlanSettings({ subscription }: PlanSettingsProps) {
    return (
        <div>
            <CurrentPlan subscription={subscription} />
            {/* <Pricing /> */}
        </div>
    );
}
