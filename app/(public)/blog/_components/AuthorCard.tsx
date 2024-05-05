import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';

type AuthorCardProps = {
    date: string;
};
export function AuthorCard({ date }: AuthorCardProps) {
    return (
        <div className='flex items-center gap-3'>
            <Avatar className='h-full'>
                <AvatarImage
                    src={'/images/placeholders/user.png'}
                    alt='avatar'
                />
                <AvatarFallback className='text-[10px]'>RS</AvatarFallback>
            </Avatar>
            <div>
                <p className='text-sm font-semibold'>Ricardo Sala</p>
                <p className='text-sm text-muted-foreground'>
                    {new Date(date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
    );
}
