import Link from 'next/link';
import { cn } from '@/lib/utils';

type SwitchLinkProps = {
    signIn?: boolean;
    signUp?: boolean;
    resetPassword?: boolean;
    className?: string;
};

// SwitchLogin component
export function SwitchLogin({
    signIn,
    signUp,
    resetPassword,
    className,
}: SwitchLinkProps) {
    return (
        <div className={cn(`flex flex-col gap-2`, className)}>
            {signUp && (
                <div className='text-sm'>
                    ¿No tienes cuenta?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href='/auth/signup'
                    >
                        Regístrate
                    </Link>
                </div>
            )}
            {/* {resetPassword && (
                <div className='text-sm'>
                    ¿Has olvidado tu contraseña?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href='/auth/reset-password'
                    >
                        Recupérala
                    </Link>
                </div>
            )} */}

            {signIn && (
                <div className='text-sm'>
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href='/auth/signin'
                    >
                        Entra
                    </Link>
                </div>
            )}
        </div>
    );
}
