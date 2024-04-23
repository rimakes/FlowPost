import { Languages, Smile, Sparkles, TextQuote } from 'lucide-react';

export const getSuggestionItems = ({ query }: { query: string }) => {
    const suggestionItems = [
        {
            title: 'Continúa escribiendo',
            description: 'Deja que la IA continúe tu texto.',
            searchTerms: ['gpt', 'ai', 'complete'],
            icon: Sparkles,
        },
        {
            title: 'Crea bullet points',
            description: 'Crea un resumen de tu texto.',
            searchTerms: ['gpt', 'ai', 'complete'],
            icon: <TextQuote />,
        },
        {
            title: 'Añade emojis',
            description: 'Añade emojis a tu texto.',
            searchTerms: ['gpt', 'ai', 'complete'],
            icon: <Smile />,
        },
        {
            title: 'Traduce a inglés',
            description: 'Traduce tu texto a inglés.',
            searchTerms: ['gpt', 'ai', 'complete'],
            icon: <Languages />,
        },
    ];

    return suggestionItems.filter((item) => {
        if (typeof query === 'string' && query.length > 0) {
            const search = query.toLowerCase();
            return (
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                (item.searchTerms &&
                    item.searchTerms.some((term) => term.includes(search)))
            );
        }
        return true;
    });
};
