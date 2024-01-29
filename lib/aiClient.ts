import { OpenAI } from 'langchain/llms/openai';

export const chat = new OpenAI({
    streaming: true,
    callbacks: [
        {
            handleLLMNewToken(token) {
                sse.send(token, 'newToken');
            },
        },
    ],
});
