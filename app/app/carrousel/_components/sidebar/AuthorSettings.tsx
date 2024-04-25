import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext } from 'react';
import { CarouselContext } from '../CarouselProvider';
import { Switch } from '@/components/ui/switch';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export const AuthorSettings = () => {
    const {
        carousel,
        carousel: {
            author: { name, handle, pictureUrl },
            settings: { showAuthor, showName },
        },
        editName,
        editHandle,
        toggleCarouselSetting: toggleCarouselSetting,
    } = useContext(CarouselContext);

    return (
        <Collapsible>
            <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <div className='flex cursor-pointer items-center'>Autor</div>
                <ChevronsUpDown size={20} className='ml-2' />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className='mt-2 space-y-4'>
                    <div className=''>
                        <div className='flex items-center justify-between py-1'>
                            <Label htmlFor='name'>Nombre</Label>
                            <Switch
                                className=''
                                id='name'
                                checked={carousel.settings.showName}
                                onCheckedChange={() => {
                                    toggleCarouselSetting('showName');
                                }}
                            />
                        </div>

                        <Input
                            placeholder='Nombre'
                            value={name!}
                            onChange={(event) => {
                                editName(event.target.value);
                            }}
                        />
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between  py-1'>
                            <Label htmlFor='handle'>Handle</Label>
                            <Switch
                                id='handle'
                                checked={carousel.settings.showHandle}
                                onCheckedChange={() => {
                                    toggleCarouselSetting('showHandle');
                                }}
                            />
                        </div>{' '}
                        <Input
                            placeholder='Handle'
                            id='handle'
                            value={handle!}
                            onChange={(event) => {
                                editHandle(event.target.value);
                            }}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox
                            checked={carousel.settings.showAuthorInFirstOnly}
                            onCheckedChange={() =>
                                toggleCarouselSetting('showAuthorInFirstOnly')
                            }
                        />
                        <Label className='text-xs font-normal italic'>
                            Mostrar solo en primera y última página
                        </Label>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>

        // </ToggleableCollapsible>
    );
};
