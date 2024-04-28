'use server';

import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { generateIdeasPrompt } from '../app/ideas/const';
import { getFirstSettingsByUserId } from '../_data/other.data';
import {
    createIdeaByAuthorId,
    deleteIdeaById,
    getIdeasByUserId,
} from '@/app/_data/idea.data';
import { arrayOfIdeasSchema } from '@/types/schemas';
import { retryAsyncFunction } from '@/lib/utils';
import { aiChat } from '@/lib/aiClients';
import { getServerSession } from '@/auth';

export const generateIdeas = async (topic: string) => {
    const model = aiChat('ideas');

    const data = await getServerSession();
    const settings = await getFirstSettingsByUserId(data!.user.id);

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

export const createIdea = async (ideaDescription: string, authorId: string) => {
    const idea = await createIdeaByAuthorId(authorId, ideaDescription);
    return idea;
};

export const deleteIdea = async (ideaId: string) => {
    const idea = await deleteIdeaById(ideaId);

    return idea;
};

export const ideasbyUserId = async (userId: string) => {
    const ideas = await getIdeasByUserId(userId);

    return ideas;
};
