// REVIEW: For support, we can use intercom https://www.intercom.com/early-stage, or tawk to (free) or zendesk (startup) or drift

import { IdeasPageClient } from './IdeasPageClient';
import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';

export default function IdeasPage() {
    return (
        <div>
            <Heading
                className='mt-6'
                title='Ideas para post'
                subtitle='Genera ideas para tus post'
            />
            <Separator className='mb-6' />
            <IdeasPageClient />
        </div>
    );
}
