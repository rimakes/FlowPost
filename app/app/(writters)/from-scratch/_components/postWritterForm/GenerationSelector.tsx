import { useController, useFormContext } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@ui/dialog';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { SelectPostTemplate } from '@/app/app/(writters)/from-scratch/_components/postWritterForm/SelectPostTemplate';
import { PostWritterFormProps } from '@/app/app/(writters)/from-scratch/_components/postWritterForm/postWritterFormSchema';
import { Badge } from '@ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@ui/select';

export const GenerationSelector = ({
    writtingStyles,
}: {
    writtingStyles: PostWritterFormProps['writtingStyles'];
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const form = useFormContext();
    const generationTypeField = useController({ name: 'generationType' }).field;

    const onSelectPostTemplate = (id: string) => {
        setIsDialogOpen(false);
        form.setValue('templateId', id, { shouldValidate: true });
    };

    return (
        <RadioGroup
            defaultValue='framework'
            value={generationTypeField.value}
            onValueChange={(value) => {
                generationTypeField.onChange(value);
            }}
        >
            {!form.getValues('templateId') && (
                <FormField
                    control={form.control}
                    name='templateId'
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex items-baseline gap-4 rounded-md border p-4'>
                                <RadioGroupItem
                                    value='framework'
                                    id='r1'
                                    className=''
                                />
                                <div className='flex flex-col items-start gap-3'>
                                    <div>
                                        <p className=''>
                                            ¿Qué plantilla probada quieres usar?
                                        </p>
                                        <FormDescription>
                                            Hemos seleccionado más de 30
                                            plantillas virales. Selecciona la
                                            que más se adapta a tu post
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        {generationTypeField.value ===
                                            'framework' && (
                                            <Dialog
                                                open={isDialogOpen}
                                                onOpenChange={(isOpen) =>
                                                    setIsDialogOpen(isOpen)
                                                }
                                            >
                                                <DialogTrigger
                                                    asChild
                                                    className=''
                                                >
                                                    <Button
                                                        variant={'outline'}
                                                        type='button'
                                                        className={`${
                                                            field.value &&
                                                            'hidden'
                                                        }`}
                                                    >
                                                        <Plus className='mr-2 h-5 w-5' />
                                                        Elige Plantilla
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='max-w-full border-0 border-green-500 md:max-w-4xl'>
                                                    <SelectPostTemplate
                                                        setSelected={
                                                            onSelectPostTemplate
                                                        }
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {!form.getValues('templateId') && (
                <FormField
                    control={form.control}
                    name='writtingStyleId'
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex items-baseline gap-4 rounded-md border p-4'>
                                <RadioGroupItem
                                    value='writtingStyle'
                                    id='r1'
                                    className=''
                                />
                                <div className='flex flex-col items-start gap-3'>
                                    <div className='space-y-4'>
                                        <div className='space-y-1'>
                                            <p>Usa tu Estilo </p>
                                            <Badge className=''>Beta</Badge>
                                        </div>
                                        <FormDescription>
                                            Selecciona el estilo que prefieras.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        {generationTypeField.value ===
                                            'writtingStyle' && (
                                            <>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger className='w-48'>
                                                        <SelectValue placeholder='Selecciona Estilo' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {writtingStyles.map(
                                                            (style) => (
                                                                <SelectItem
                                                                    key={
                                                                        style.id
                                                                    }
                                                                    value={
                                                                        style.id
                                                                    }
                                                                >
                                                                    {style.name}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </RadioGroup>
    );
};
