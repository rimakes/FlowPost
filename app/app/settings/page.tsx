import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSettings } from './_components/AccountSettings';
import { IASettings } from './_components/IASettings';
import { BrandKitsSettings } from './_components/BrandKitsSettings';
import {
    getUserBrands,
    getUserSettings,
} from '@/app/_actions/settings-actions';
import { signIn } from 'next-auth/react';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { PlanSettings } from './_components/PlanSettings';
import { TPageProps } from '@/types/types';
import { getSubscription } from '@/app/_actions/other-actions';

export default async function IdeasPage({ params, searchParams }: TPageProps) {
    const tab = searchParams['tab'] as string;

    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        signIn();
    }

    const userBrandKits = await getUserBrands(session!.user.id);
    const userSettings = await getUserSettings(session!.user.id);
    const subscription = await getSubscription();

    return (
        <>
            <Heading
                className='mt-6'
                title='Configuración'
                subtitle='Configura tu espacio de trabajo'
            />
            <Separator />
            <div className='mt-6 space-y-4 2xl:flex gap-8'>
                <Tabs defaultValue={tab || 'general'} className='w-full'>
                    <div className='overflow-x-auto mb-8 '>
                        <TabsList className='flex justify-between w-full max-w-md'>
                            <TabsTrigger value='general'>General</TabsTrigger>
                            <TabsTrigger value='plan'>Subscripción</TabsTrigger>
                            {/* <TabsTrigger value='team'>Equipo</TabsTrigger> */}
                            <TabsTrigger value='ai'>IA</TabsTrigger>
                            <TabsTrigger value='brands'>Tus Marcas</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='general'>
                        <AccountSettings />
                    </TabsContent>
                    <TabsContent value='plan'>
                        <PlanSettings subscription={subscription} />
                    </TabsContent>
                    {/* <TabsContent value='team'></TabsContent> */}
                    <TabsContent value='ai'>
                        <IASettings
                            userIaSettings={userSettings?.iaSettings!}
                        />
                    </TabsContent>
                    <TabsContent value='brands'>
                        <BrandKitsSettings userBrandKits={userBrandKits} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
