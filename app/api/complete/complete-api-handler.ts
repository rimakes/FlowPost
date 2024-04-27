import { StreamingTextResponse } from 'ai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { PromptTemplate } from '@langchain/core/prompts';
import { WritterReq } from '@/app/api/complete/route';
import { authOptions } from '@/auth';
import { COMPLETE_INSTRUCTIONS } from '@/config/const';
import { aiChat } from '@/lib/aiClients';
import { db } from '@/lib/prisma';

export async function completeApiHandler(body: any) {
    const {
        data: { description, instructionsId },
    }: WritterReq<'COMPLETE'> = body;

    console.log(description, instructionsId, 'COMPLETE');
    if (typeof description !== 'string' || typeof instructionsId !== 'string') {
        return NextResponse.json(
            { error: 'Datos incorrectos, prueba de nuevo' },
            { status: 400 }
        );
    }

    const model = aiChat('writter');

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

    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 1) {
        throw new Error('Random error');
    }

    // TODO: use this instead so you learn about streams: https://michaelangelo.io/blog/server-sent-events
    return new StreamingTextResponse(stream);
}
