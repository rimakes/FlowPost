import { Separator } from '../ui/separator';
import { SocialLogin } from '../auth/SocialLogin';
import { Heading } from './Heading';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CardWrapperProps = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    className?: string;
};

export function CardWrapper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    className,
}: CardWrapperProps) {
    return (
        <Card className={cn(`max-w-[350] border-none shadow-none`, className)}>
            <CardHeader>
                <Heading title='Welcome back! ✨' />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <>
                    <CardFooter className='flex-col'>
                        <Separator />
                        <SocialLogin />
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
