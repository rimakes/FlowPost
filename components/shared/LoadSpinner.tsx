import { Loader, Loader2 } from 'lucide-react';
import Spinner from '../icons/spinner';

type LoadSpinnerProps = {};
export function LoadSpinner({}: LoadSpinnerProps) {
    return (
        <div className='flex flex-col justify-center items-center grow'>
            <div className='h-1/4 aspect-square'>
                <Loader2 className='h-full w-full animate-spin text-muted-foreground' />
            </div>
        </div>
    );
}
