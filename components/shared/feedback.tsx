'use client';

import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import Spinner from '../icons/SpinnerIcon';
import { InputFaces, KeyFrames } from './InputFaces';
import { cn } from '@/lib/utils';
import { appConfig } from '@/config/shipper.appconfig';
import { useClickOutside } from '@/hooks/use-click-outside';
import { TFeedback } from '@/types/types';

export default function Feedback({}) {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState<TFeedback>('');
    const [message, setMessage] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [isSurveyVisible, setIsSurveyVisible] = useState(true);
    const textAreaRef = useRef(null);

    // TODO: get to focus the text area when the user has click rating and after the transition has finished

    const elementRef = useClickOutside(() => {
        setIsVisible(false);
    });

    const onSubmit = async () => {
        setIsLoading(true);
        const res = fetch('/api/mg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value, message }),
        })
            .then((res) => {
                console.log(res);
            })
            .finally(() => {
                setMessage('');
                setValue('');
                setIsLoading(false);
                setIsVisible(false);
                toast.success('Gracias por tu opinión');
            });
    };

    if (!isSurveyVisible) return;

    return (
        <div
            // REVIEW
            // @ts-ignore
            ref={elementRef}
            onTransitionEnd={(event) => {
                if (event.propertyName === 'opacity' && !isVisible) {
                    // setIsDisplaying(false);
                }
            }}
            className={cn(
                `animate fixed right-0 top-[300px] isolate  z-50 translate-x-full rounded-bl-lg rounded-tl-lg bg-background drop-shadow-xl transition-transform duration-1000
                `,
                isVisible ? 'translate-x-0' : ''
            )}
        >
            <KeyFrames />

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className='group p-6 text-center'>
                    <p
                        className='mb-4
          '
                    >
                        ¿Qué opinas de {appConfig.general.appName}?
                    </p>
                    <InputFaces value={value} setValue={setValue} />
                </div>

                <div
                    className={cn(
                        `
                  max-h-0 overflow-hidden px-6 pt-0 [transition:max-height_1s_ease-in-out,_padding_1s_ease-in-out]
                  `,
                        value !== '' && 'max-h-[500px] py-6'
                    )}
                >
                    <label
                        className='inline-block text-sm'
                        htmlFor='emoji-rate-msg'
                    >
                        ¿Nos cuentas un poco más?
                    </label>

                    <textarea
                        ref={textAreaRef}
                        autoFocus
                        className='w-full resize-none appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-[1em] leading-tight outline-none transition duration-200 placeholder:text-gray-400 placeholder:opacity-100 focus-within:border-indigo-700'
                        rows={4}
                        name='emoji-rate-msg'
                        id='emoji-rate-msg'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className='mt-3 text-right'>
                        <Button disabled={isloading}>
                            {isloading && <Spinner className='mr-2' />}
                            Enviar
                        </Button>
                    </div>
                </div>
            </form>

            <div
                className='absolute left-0 top-0 -translate-x-full translate-y-1/4 cursor-pointer rounded-l-lg bg-background p-4 px-1 text-sm text-primary transition [writing-mode:vertical-rl;] hover:bg-background'
                onClick={() => setIsVisible(!isVisible)}
            >
                Feedback
            </div>

            <Button
                variant='ghost'
                className='absolute right-2 top-2 cursor-pointer'
                onClick={() => {
                    setIsVisible(false);
                }}
            >
                <X className='h-4 w-4' />
            </Button>
        </div>
    );
}
