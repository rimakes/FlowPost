import { createWebmFile } from '@/app/_actions/test';
import { useState, useEffect, useCallback, useRef } from 'react';

interface MicrophoneHook {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    toggleRecording: () => void;
    audioData: Blob | null;
    error: string | null;
}

const useMicrophone = ({
    isMicAllowed,
    onMicAllowed,
    speech,
    setSpeech,
}: {
    isMicAllowed: boolean;
    onMicAllowed: (isAllowed: boolean) => void;
    speech: string;
    setSpeech: (speech: string) => void;
}): MicrophoneHook => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioData, setAudioData] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    // Clean up media recorder
    useEffect(() => {
        // clean up function
        return () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
        };
    }, [mediaRecorder]);

    // Check for media devices support
    useEffect(() => {
        // Check for media devices support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('getUserMedia() not supported.');
            setError(
                'Media Devices API or getUserMedia not supported in this browser.'
            );
            return;
        }
    }, []);

    const initMediaRecorder = useCallback(async () => {
        let chunks: BlobPart[] = [];
        let stream: MediaStream | null = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            onMicAllowed(true);

            const recorder = new MediaRecorder(stream!, {
                mimeType: 'audio/webm',
            });
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder!.onstop = async () => {
                console.log('recording stopped');
                // When recording stops, you can do something with the data
                const audioBlob = new Blob(chunks, {
                    type: 'audio/webm',
                });
                setAudioData(audioBlob);
                const formData = new FormData();
                formData.append('audio', audioBlob, 'recording.webm');

                const transcription = await createWebmFile(formData);
                setSpeech(transcription);
                console.log(transcription);
                chunks = []; // Reset chunks for next recording
                // const audioUrl = URL.createObjectURL(audioBlob);
                // const audio = new Audio(audioUrl);
                // audio.play();
            };
            mediaRecorderRef.current = recorder;
        } catch (err) {
            setError(
                'Could not access the microphone. User denied or other error.'
            );
            onMicAllowed(false);
        }
    }, [onMicAllowed, setSpeech]);

    useEffect(() => {
        if (!isMicAllowed) return;
        initMediaRecorder();
    }, [initMediaRecorder, isMicAllowed]);

    const startRecording = useCallback(() => {
        if (!mediaRecorderRef.current) {
            setError('MediaRecorder not initialized.');
            return;
        }
        console.log('start recording');
        setIsRecording(true);
        mediaRecorderRef.current.start();
    }, []);

    const stopRecording = useCallback(() => {
        console.log('stop recording');
        if (!mediaRecorderRef.current) {
            setError('MediaRecorder not initialized.');
            return;
        }
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    }, []);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return {
        isRecording,
        startRecording,
        stopRecording,
        toggleRecording,
        audioData,
        error,
    };
};

export default useMicrophone;
