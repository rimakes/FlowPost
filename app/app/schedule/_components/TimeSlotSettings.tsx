'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Settings } from 'lucide-react';
import { SchedulerInput } from './SchedulerInput';
import { TSlot } from '@/types/types';

type TimeSlotSettingsProps = {
    schedule: TSlot[];
};

export function TimeSlotSettings({ schedule }: TimeSlotSettingsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className=''>
                    <Settings className='mr-2 text-primary/50' /> Configurar
                    horario
                </Button>
            </DialogTrigger>
            <DialogContent>
                <h2>Configuración de Horario</h2>
                <Separator />
                <SchedulerInput schedule={schedule} />
            </DialogContent>
        </Dialog>
    );
}
