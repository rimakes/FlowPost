// TODO: to implement tracing and feedback from the user

import { ChatOpenAI, DallEAPIWrapper } from '@langchain/openai';
import { OpenAIWhisperAudio } from 'langchain/document_loaders/fs/openai_whisper_audio';
import { getAiModel } from './utils';

export const aiChat = (
    use: 'ideas' | 'writter' | 'carousel',
    streaming = false,
    temperature = 0.8,
    maxTokens = 3000
    // TODO:
    // callbacks: OpenAIStreamCallbacks = [] as OpenAIStreamCallbacks
) => {
    return new ChatOpenAI({
        temperature,
        modelName: getAiModel(use),
        maxTokens,
        streaming,
        callbacks: [
            {
                handleLLMNewToken(token) {
                    console.log(token);
                },
            },
        ],
    });
};

// const imageGeneration = new DallEAPIWrapper({
//     n: 1, // Default
//     modelName: 'dall-e-3', // Default
//     openAIApiKey: process.env.OPENAI_API_KEY, // Default
//     quality: 'standard', // Default
// });

export const aiDraw = (
    n = 1,
    model = 'dall-e-3',
    quality: 'standard' | 'hd' | undefined = 'standard'
) => {
    return new DallEAPIWrapper({
        n,
        modelName: model,
        openAIApiKey: process.env.OPENAI_API_KEY,
        quality,
    });
};

export const aiTranscribe = (filePath: string) => {
    return new OpenAIWhisperAudio(filePath, {
        clientOptions: {
            // TODO: How can we add parameters to the client?
            // response_format: 'vtt',
        },
    });
};
