import { ApiRequestBody, ApiResponse } from '@/types/types';
import { getAiModel } from '@/lib/utils';
import { ChatOpenAI } from '@langchain/openai';
import { StreamingTextResponse } from 'ai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { COMPLETE_INSTRUCTIONS } from '@/config/const';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;

        switch (action) {
            case 'COMPLETE':
                const {
                    data: { description, instructionsId },
                }: WritterReq<'COMPLETE'> = body;

                console.log(description, instructionsId, 'COMPLETE');
                if (
                    typeof description !== 'string' ||
                    typeof instructionsId !== 'string'
                ) {
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                const model = new ChatOpenAI({
                    temperature: 0.8,
                    modelName: getAiModel('writter'),
                    maxTokens: 3000,
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

                const userId = data?.user?.id;
                // TODO: check if user is logged in
                const settings = await db.settings.findFirst({
                    where: {
                        user: {
                            id: userId,
                        },
                    },
                });
                const iaSettings = settings?.iaSettings;

                const promptTemplate = PromptTemplate.fromTemplate(
                    `{instructions}
                    user:{description}
                    assistant: `
                    // `${writterPrompt} ${getPostTemplateById(templateId).content} ${promptEnd}`
                );

                const outputParser = new HttpResponseOutputParser({});

                // We create a chain that pipes our prompt template into the model, and then the model into the output parser
                const chain = promptTemplate.pipe(model).pipe(outputParser);

                // We start the chain as a stream
                const stream = await chain.stream({
                    instructions:
                        COMPLETE_INSTRUCTIONS[
                            instructionsId as keyof typeof COMPLETE_INSTRUCTIONS
                        ],
                    description,
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

export type TCompleteRequest = {
    instructionsId: string;
    description: string;
};

type RouteApiMap = {
    COMPLETE: {
        reqData: TCompleteRequest;
        resData: string;
    };
};

type RouteActions = keyof RouteApiMap;

export type WritterRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type WritterReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;
