import { z } from 'zod';

const MAX_LENGTH = 1000;
const MIN_LENGTH = 10;
const tooShortError = `Demasiado corto. Escribe al menos ${MIN_LENGTH} caracteres`;
const tooLongError = `Demasiado largo. Escribe menos de ${MAX_LENGTH} caracteres`;

export type PostWritterFormProps = {
    className?: string;
    writtingStyles: { name: string; id: string }[];
};

export const WritterFormSchema = z
    .object({
        description: z
            .string()
            .min(MIN_LENGTH, tooShortError)
            .max(MAX_LENGTH, tooLongError),
        toneId: z
            .number()
            .nullable()
            .refine((value) => value !== null, {
                message: 'Selecciona un tono',
            }),
        writtingStyleId: z.string().nullable(),
        templateId: z.string().nullable(),
        generationType: z.enum(['framework', 'writtingStyle']),
    })
    .superRefine((data, ctx) => {
        if (
            data.generationType === 'writtingStyle' &&
            (data.writtingStyleId === null || data.writtingStyleId === '')
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Por favor, selecciona un estilo',
                path: ['writtingStyleId'],
            });
        }

        if (
            data.generationType === 'framework' &&
            (data.templateId === null || data.templateId === '')
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Por favor, selecciona una plantilla',
                path: ['templateId'],
            });
        }
    });
