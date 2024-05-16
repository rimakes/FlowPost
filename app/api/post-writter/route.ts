import { StreamingTextResponse } from 'ai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { NextRequest, NextResponse } from 'next/server';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { getPostTemplateById, getVoiceToneById } from '@/lib/utils';
import { PostRequest } from '@/app/app/(writters)/from-scratch/_components/postWritterForm/PostWritterForm';
import { generalInstructions } from '@/app/app/(writters)/assisted/config/prompts';
import { db } from '@/lib/prisma';
import { aiChat } from '@/lib/aiClients';
import { getWrittingStyleById } from '@/app/_actions/user-actions';
import { getServerSession } from '@/auth';
import { writtePostWithStyle } from '@/app/api/post-writter/const';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;
        const model = aiChat('writter');

        switch (action) {
            case 'WRITE':
                const {
                    data: {
                        description,
                        templateId,
                        toneId,
                        generationType,
                        writtingStyleId,
                    },
                }: WritterReq<'WRITE'> = body;

                if (generationType === 'writtingStyle') {
                    if (!writtingStyleId || !toneId) {
                        return NextResponse.json(
                            { error: '' },
                            { status: 400 }
                        );
                    }

                    const style = await getWrittingStyleById(writtingStyleId);
                    const promptTemplate =
                        PromptTemplate.fromTemplate(writtePostWithStyle);
                    const outputParser = new HttpResponseOutputParser({});

                    const chain = promptTemplate.pipe(model).pipe(outputParser);

                    const randomPost =
                        style?.inputs.posts[
                            Math.floor(
                                Math.random() * style?.inputs.posts.length
                            )
                        ];

                    // We start the chain as a stream
                    const stream = await chain.stream({
                        example: randomPost!,
                        style: style?.description!,
                        tone: getVoiceToneById(toneId!).name,
                        topic: description,
                    });

                    // TODO: use this instead so you learn about streams: https://michaelangelo.io/blog/server-sent-events
                    return new StreamingTextResponse(stream);
                }

                if (generationType === 'framework') {
                    if (!templateId || !toneId) {
                        return NextResponse.json(
                            { error: '' },
                            { status: 400 }
                        );
                    }

                    // Get the custom AISettings from the user
                    const data = await getServerSession();
                    let userId = data?.user?.id;

                    // If the user is not logged in, use a "demo" user so she/he can create posts as well
                    if (!userId) userId = '6612d5fa2d7c90dd54bf695a';

                    const settings = await db.settings.findFirst({
                        where: {
                            user: {
                                id: userId,
                            },
                        },
                    });
                    const iaSettings = settings?.iaSettings;

                    const promptTemplate = PromptTemplate.fromTemplate(
                        `
                        ${iaSettings?.shortBio ? `Eres ${iaSettings?.shortBio} y` : 'Eres un experto en tu campo y'} ${iaSettings?.topics ? `hablas sobre ${iaSettings?.topics}` : 'hablas sobre temas de interés'}.
                        ${iaSettings?.other ? `Además, ${iaSettings?.other}` : ''}
    
                        Escribe el mejor post de linkedin que puedas siguiendo esta plantilla (NO exactamente, inspírate en ella, pero adáptala al tono, y cambia palabras y expresiones para generar variedad) o ejemplo pero en un tono {tone}:
    
                        ___PLANTILLA-O-EJEMPLO___
                        {example}.
                        ___END_PLANTILLA-O-EJEMPLO___
    
                        
                        __INSTRUCTIONS__
                        Solo devuelve el texto del post, no intro, no outro, no ###.
    
    
                        Conserva los saltos de línea, emojis, cursivas, etc. son importantes
    
                        El texto entre curly braces es un marcador de posición, NO LO INCLUYAS. Reemplázalo con el contenido que tenga sentido.
    
                        Puedes modificar la plantilla para que tu post sea {tone}. No la sigas al pie de la letra.
    
                        Escribe en Español de España.
    
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
