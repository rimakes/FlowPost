'use client';
import { useRouter } from 'next/navigation';
import { VOICE_TONES } from '@/app/app/(writters)/assisted/config/const';
import { proToast } from '@/lib/utils';
import { VoiceTone } from '@/types/types';
import { Button } from '@ui/button';

export const VoiceToneSelector = ({
    selectedTone,
    onSelectTone,
    availableTones = VOICE_TONES.map((tone) => tone.id),
}: {
    selectedTone?: VoiceTone['id'];
    onSelectTone: (value: VoiceTone['id']) => void;
    availableTones?: VoiceTone['id'][];
}) => {
    const router = useRouter();

    return (
        <div className='flex flex-wrap gap-2'>
            {VOICE_TONES.map((tone) => {
                const isAvailable = availableTones.includes(tone.id);
                return (
                    <Button
                        type='button'
                        key={tone.name}
                        variant={
                            selectedTone === tone.id ? 'secondary' : 'outline'
                        }
                        className={`${!isAvailable && 'opacity-50'} flex gap-2 rounded-full
                        ${selectedTone === tone.id ? 'bg-indigo-100' : ''}
                        `}
                        onClick={() => {
                            if (!isAvailable)
                                return proToast(
                                    router,
                                    'Este tono no está disponible para tu plan'
                                );
                            onSelectTone(tone.id);
                        }}
                    >
                        <span className='h-5 w-5'>{tone.emoji}</span>
                        {tone.name}
                    </Button>
                );
            })}
        </div>
    );
};
