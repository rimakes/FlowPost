import { updateUserCredits } from '@/app/_actions/user-actions';
import { useSession } from 'next-auth/react';

export const useUserCredits = () => {
    const { data: session, update: updateSession } = useSession();
    const creditBalance = session?.user?.creditBalance!;

    const update = async (creditBalance: number) => {
        const updatedUser = await updateUserCredits(
            session?.user?.id!,
            creditBalance
        );
        const updatedBalance = updatedUser.creditBalance;
        await updateSession({
            ...session?.user,
            creditBalance: updatedBalance,
        });
    };

    return { creditBalance, update };
};
