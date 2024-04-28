import { db } from '@/lib/prisma';

export const createIdeaByAuthorId = async (
    authorId: string,
    description: string
) => {
    try {
        const idea = await db.idea.create({
            data: {
                description,
                author: { connect: { id: authorId } },
            },
        });

        return idea;
    } catch (error) {
        console.error('Error creating idea', error);
        throw new Error('Error creating idea');
    }
};

export const deleteIdeaById = async (ideaId: string) => {
    try {
        const idea = await db.idea.delete({
            where: {
                id: ideaId,
            },
        });

        return idea;
    } catch (error) {
        console.error('Error deleting idea', error);
        throw new Error('Error deleting idea');
    }
};

export const getIdeasByUserId = async (userId: string) => {
    try {
        const ideas = await db.idea.findMany({
            where: {
                authorId: userId,
            },
        });

        return ideas;
    } catch (error) {
        console.error('Error getting ideas', error);
        throw new Error('Error getting ideas');
    }
};
