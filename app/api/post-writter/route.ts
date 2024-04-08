import bcrypt from 'bcryptjs';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { register } from '@/lib/register-user';
import { User } from '@prisma/client';
import { RegisterFormValues } from '@/schemas/auth-schemas';
import { getPostTemplateById, getVoiceToneById, wait } from '@/lib/utils';
import {
    WritterFormSchema,
    PostRequest,
} from '@/app/app/post-writter/_components/PostWritterForm';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { StreamingTextResponse } from 'ai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import {
    generalInstructions,
    writterPrompt,
} from '@/app/app/post-writter/config/prompts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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
                    description === 'string' || //TODO:  what is this?
                    typeof templateId !== 'string' ||
                    typeof toneId !== 'number'
                ) {
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                const model = new ChatOpenAI({
                    temperature: 0.8,
                    modelName: 'gpt-4-0613',
                    streaming: true,
                    callbacks: [
                        {
                            handleLLMNewToken(token) {
                                // console.log(token);
                            },
                        },
                    ],
                });

                // Get the custom AISettings from the user
                const data = await getServerSession(authOptions);
                const settings = await db.settings.findFirst({
                    where: {
                        user: {
                            id: data!.user.id,
                        },
                    },
                });
                const iaSettings = settings?.iaSettings;

                const promptTemplate = PromptTemplate.fromTemplate(
                    `
                    ${iaSettings?.shortBio ? `Eres ${iaSettings?.shortBio} y` : 'Eres un experto en tu campo y'} ${iaSettings?.topics ? `hablas sobre ${iaSettings?.topics}` : 'hablas sobre temas de interés'}.
                    ${iaSettings?.other ? `Además, ${iaSettings?.other}` : ''}

                    Escribe el mejor post de linkedin que puedas siguiendo esta plantilla o ejemplo pero en un tono {tone}:

                    ___PLANTILLA-O-EJEMPLO___
                    {example}.
                    ___END_PLANTILLA-O-EJEMPLO___

                    
                    __INSTRUCTIONS__
                    Only return the post text, no intro, not outro, no ###.


                    Keep the line breaks, emojis, bold, italic, etc. they are important

                    The text between curly braces is a placeholder, DO NOT INCLUDE IT. Replace it with the content that makes sense.

                    Puedes modificar la plantilla para que tu post sea {tone}. No la sigas al pie de la letra.

                    Las frases entre <> deben ser MUY POCO modificadas. Procura matenerlas tal cual.
                    __END_INSTRUCTIONS__

                    __USER_PROMPT__
                          
                    Apply the template to this content (complete what necesary): 
                    {userPrompt}.
                    ___END_USER_PROMPT___
                    `
                    // `${writterPrompt} ${getPostTemplateById(templateId).content} ${promptEnd}`
                );

                const outputParser = new HttpResponseOutputParser({});

                // We create a chain that pipes our prompt template into the model, and then the model into the output parser
                const chain = promptTemplate.pipe(model).pipe(outputParser);

                // We start the chain as a stream
                const stream = await chain.stream({
                    example: getPostTemplateById(templateId).content,
                    instructions: generalInstructions,
                    userPrompt: description,
                    tone: getVoiceToneById(toneId).name,
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
