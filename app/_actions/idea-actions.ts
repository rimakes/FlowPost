'use server';

import { getAiModel, retryAsyncFunction } from '@/lib/utils';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { arrayOfIdeasSchema } from '@/types/schemas';
import { RunnableSequence } from '@langchain/core/runnables';
import { generateIdeasPrompt } from '../app/ideas/const';
import axios from 'axios';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export const generateIdeas = async (topic: string) => {
    const model = new ChatOpenAI({
        temperature: 0.8,
        modelName: getAiModel('ideas'),
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

    const customizedSettings = `
                    ${iaSettings?.shortBio ? `Eres ${iaSettings?.shortBio} y` : 'Eres un experto en tu campo y'} ${iaSettings?.topics ? `hablas sobre ${iaSettings?.topics}` : 'hablas sobre temas de interés'}.
                    ${iaSettings?.other ? `Además, ${iaSettings?.other}` : ''}`;

    const promptTemplate = PromptTemplate.fromTemplate(
        customizedSettings + generateIdeasPrompt
    );

    const parser = StructuredOutputParser.fromZodSchema(arrayOfIdeasSchema);

    const chain = RunnableSequence.from([promptTemplate, model, parser]);

    const fn = () =>
        chain.invoke(
            {
                topic,
                format_instructions: parser.getFormatInstructions(),
            },
            { tags: ['ideas'] }
        );

    const ideas = await retryAsyncFunction(fn, 3, 1000);

    return ideas;
};

// Parameters: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=es-419
export const getSearchResults = async (query: string) => {
    const res = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_SEARCH_API_KEY}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&dateRestrict=m3&q=${query}`
    );
    return res.data.items;
};

export const createIdea = async (ideaDescription: string, authorId: string) => {
    const idea = db.idea.create({
        data: {
            description: ideaDescription,
            author: { connect: { id: authorId } },
        },
    });

    return idea;
};

export const deleteIdea = async (ideaId: string) => {
    const idea = db.idea.delete({ where: { id: ideaId } });

    return idea;
};
