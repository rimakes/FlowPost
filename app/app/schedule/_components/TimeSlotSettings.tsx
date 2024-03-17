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

const fakeSchedule: TSlot[] = [
    {
        day: 'MON',
        time: '10:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '11:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '12:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '13:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '14:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '15:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '16:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '17:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '18:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '19:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '20:00',
        isSlot: true,
    },
    {
        day: 'MON',
        time: '21:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '10:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '11:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '12:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '13:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '14:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '15:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '16:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '17:00',
        isSlot: true,
    },
    {
        day: 'TUE',
        time: '18:00',
        isSlot: true,
    },
];

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
