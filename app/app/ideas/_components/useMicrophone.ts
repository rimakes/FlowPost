import { createWebmFile } from '@/app/_actions/writter-actions';
import { useState, useEffect, useCallback, useRef } from 'react';

interface MicrophoneHookReturn {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    toggleRecording: () => void;
    audioData: Blob | null;
    error: string | null;
    initMediaRecorder: () => void;
}

interface UseMicrophoneProps {
    onMicAllowed: (isAllowed: boolean) => void;
    setSpeech: (speech: string) => void;
}

const useMicrophone = ({
    onMicAllowed,
    setSpeech,
}: UseMicrophoneProps): MicrophoneHookReturn => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioData, setAudioData] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);

    // Clean up media recorder
    useEffect(() => {
        const mediaRecorder = mediaRecorderRef.current;
        // clean up function
        return () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
        };
    }, [mediaRecorderRef]);

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
                chunksRef.current.push(e.data);
            };

            recorder!.onstop = async () => {
                console.log('recording stopped');
                // When recording stops, you can do something with the data
                const audioBlob = new Blob(chunksRef.current, {
                    type: 'audio/webm',
                });
                setAudioData(audioBlob);
                const formData = new FormData();
                formData.append('audio', audioBlob, 'recording.webm');

                const transcription = await createWebmFile(formData);
                setSpeech(transcription);
                console.log(transcription);
                chunksRef.current = []; // Reset chunks for next recording
                // const audioUrl = URL.createObjectURL(audioBlob);
                // const audio = new Audio(audioUrl);
                // audio.play();
            };
            mediaRecorderRef.current = recorder;
            console.log('MediaRecorder initialized');
        } catch (err) {
            setError(
                'Could not access the microphone. User denied or other error.'
            );
            onMicAllowed(false);
        }
    }, [onMicAllowed, setSpeech]);

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
        initMediaRecorder,
        startRecording,
        stopRecording,
        toggleRecording,
        audioData,
        error,
    };
};

export default useMicrophone;
