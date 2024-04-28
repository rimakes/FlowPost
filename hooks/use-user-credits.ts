import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { updateUserCredits } from '@/app/_actions/user-actions';
import { AppContext } from '@/providers/AppProvider';
import { getCreditsByPriceId } from '@/lib/utils';

export const useUserCredits = () => {
    const { creditBalance, setCreditBalance, subscription } =
        useContext(AppContext);
    const { data: session } = useSession();

    const update = async (creditBalance: number) => {
        const updatedUser = await updateUserCredits(
            session?.user?.id!,
            creditBalance
        );
        const updatedBalance = updatedUser.creditBalance;
        setCreditBalance(updatedBalance);
    };

    const isPro = !!subscription;

    const maxCredits = !isPro ? 10 : getCreditsByPriceId(subscription);

    return { isPro, creditBalance, maxCredits, update };
};
