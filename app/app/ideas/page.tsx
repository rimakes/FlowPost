'use client';

import { useState } from 'react';
import { SpeechRecorder } from './_components/SpeechRecorder';
import ContentEditable from 'react-contenteditable';

export default function IdeasPage() {
    const [speech, setSpeech] = useState('');
    return (
        <>
            <SpeechRecorder setSpeech={setSpeech} />
            <ContentEditable
                html={speech}
                onChange={(e) => setSpeech(e.target.value)}
            />
        </>
    );
}
