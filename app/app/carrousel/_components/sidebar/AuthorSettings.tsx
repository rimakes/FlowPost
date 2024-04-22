import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

export const AuthorSettings = () => {
    const {
        carousel,
        carousel: {
            author: { name, handle, pictureUrl },
            settings: { showAuthor, showName },
        },
        editName,
        editHandle,
        toggleShowName,
        toggleShowHandle,
    } = useContext(CarouselContext);

    return (
        // <ToggleableCollapsible
        //     label='Info del autor'
        //     enabled={showAuthor}
        //     setEnabled={toggleShowAuthor}
        // >

        <Collapsible>
            <CollapsibleTrigger className='flex justify-between w-full items-center'>
                <div className='cursor-pointer flex items-center'>Autor</div>
                <ChevronsUpDown size={20} className='ml-2' />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className='space-y-4 mt-2'>
                    <div className=''>
                        <div className='flex justify-between items-center py-1'>
                            <Label htmlFor='name'>Nombre</Label>
                            <Switch
                                className=''
                                id='name'
                                checked={carousel.settings.showName}
                                onCheckedChange={toggleShowName}
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
                    {/* <div className=''>
                        <div className='flex justify-between items-center  py-1'>
                            <Label htmlFor='pic'>Foto de perfil</Label>
                            <Switch
                                id='pic'
                                checked={carousel.settings.showProfilePic}
                                onCheckedChange={toggleShowProfilePic}
                            />
                        </div>
                        <Input
                            placeholder='Nombre'
                            id='profilePic'
                            value={pictureUrl!}
                            onChange={(event) => {
                                editImage(event.target.value);
                            }}
                        />
                    </div> */}
                    <div className=''>
                        <div className='flex justify-between items-center  py-1'>
                            <Label htmlFor='handle'>Handle</Label>
                            <Switch
                                id='handle'
                                checked={carousel.settings.showHandle}
                                onCheckedChange={toggleShowHandle}
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
                    {/* TODO: For now we remove this */}
                    {/* <div className='flex gap-2 items-center'>
                        <Checkbox
                            checked={carousel.settings.showAuthorInFirstOnly}
                            onCheckedChange={toggleShowAuthorInFirstOnly}
                        />
                        <Label className='text-xs font-normal italic'>
                            Mostrar solo en primera y última página
                        </Label>
                    </div> */}
                </div>
            </CollapsibleContent>
        </Collapsible>

        // </ToggleableCollapsible>
    );
};
