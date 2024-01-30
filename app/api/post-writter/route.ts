import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { register } from '@/actions/register-user';
import { User } from '@prisma/client';
import { RegisterFormValues } from '@/schemas/auth-schemas';
import { wait } from '@/lib/utils';
import {
    CustomFormSchema,
    PostRequest,
} from '@/app/app/post-writter/_components/PostWritterForm';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { POST_TEMPLATES } from '@/app/app/post-writter/_components/const';
import { writterPrompt } from '@/prompts/prompts';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;

        switch (action) {
            case 'WRITE':
                const {
                    data: { description, templateId, toneId },
                }: WritterReq<'WRITE'> = body;

                if (
                    description === '' ||
                    typeof templateId !== 'number' ||
                    typeof toneId !== 'number'
                ) {
                    console.log(description, templateId, toneId);
                    console.log('MISSING_DATA');
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                const model = new ChatOpenAI({
                    temperature: 0.8,
                    modelName: 'gpt-3.5-turbo-1106',
                    streaming: true,
                    callbacks: [
                        {
                            handleLLMNewToken(token) {
                                console.log(token);
                            },
                        },
                    ],
                });

                const promptTemplate =
                    PromptTemplate.fromTemplate(writterPrompt);

                // REVIEW
                // This would return a string. We don't want a string (yet). We want a prompttemplate that we can then pipe into the model.
                //     const formattedPrompt = await promptTemplate.format({
                //     format: POST_TEMPLATES[templateId].content,
                //     topic: description,
                // });
                // console.log(formattedPrompt);

                const outputParser = new HttpResponseOutputParser({});

                // We create a chain that pipes our prompt template into the model, and then the model into the output parser
                const chain = promptTemplate.pipe(model).pipe(outputParser);

                // We start the chain as a stream
                const stream = await chain.stream({
                    format: POST_TEMPLATES[templateId].content,
                    topic: description,
                });

                // TODO: use this instead so you learn about streams: https://michaelangelo.io/blog/server-sent-events
                return new StreamingTextResponse(stream);
        }
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

type RouteApiMap = {
    WRITE: {
        reqData: PostRequest;
        resData: string;
    };
    // UPDATE: {
    //     reqData: StudioFormValues;
    //     resData: Studio;
    // };
};

type RouteActions = keyof RouteApiMap;

export type WritterRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type WritterReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;
