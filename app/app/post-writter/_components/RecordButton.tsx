'use client';

import { Mic, MicOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import useMicrophone from '../../../../hooks/useMicrophone';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PrefersToRecordProps = {
    onRecord: (text: string) => void;
    text: string;
};

export function RecordButton({ onRecord, text }: PrefersToRecordProps) {
    const onMicAllowed = useCallback((isAllowed: boolean) => {
        toast.success(
            isAllowed
                ? 'Clicka en el micrófono para empezar a grabarte'
                : 'Microphone is denied'
        );
    }, []);
    const [isMicroAllowed, setIsMicroAllowed] = useState(false);
    const {
        startRecording,
        stopRecording,
        toggleRecording,
        isRecording,
        initMediaRecorder,
        error,
    } = useMicrophone({
        onMicAllowed,
        setSpeech: onRecord,
    });

    const handleToggleMicStatus = () => {
        if (!isMicroAllowed) {
            setIsMicroAllowed(true);
            initMediaRecorder();
            return;
        } else if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div>
            <Button
                className={cn(
                    `absolute right-1 top-1 flex items-center justify-center`,
                    isMicroAllowed
                        ? 'bg-green-500 bg-opacity-20 hover:bg-green-500'
                        : '',
                    isRecording ? 'bg-red-500 hover:bg-red-500' : ''
                )}
                variant={'secondary'}
                size={'icon'}
                type='button'
                onClick={handleToggleMicStatus}
            >
                {!isMicroAllowed ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
        </div>
    );
}
