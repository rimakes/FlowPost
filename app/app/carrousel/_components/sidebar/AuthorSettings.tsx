import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';

export const AuthorSettings = () => {
    const {
        carousel,
        carousel: {
            author: { name, handle, pictureUrl },
            settings: { showAuthor },
        },
        editImage,
        editName,
        editHandle,
        toggleShowAuthor,
    } = useContext(CarouselContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ToggleableCollapsible
            label='Info del autor'
            enabled={showAuthor}
            setEnabled={toggleShowAuthor}
        >
            <div className='space-y-4'>
                <div>
                    <h4 className='font-semibold'>Brand kit</h4>
                    <p className='text-primary/50 text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        atque quaerat ab excepturi
                    </p>
                </div>
                <div className=''>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                        placeholder='Nombre'
                        id='name'
                        value={name!}
                        onChange={(event) => {
                            editName(event.target.value);
                        }}
                    />
                </div>
                <div className=''>
                    <Label htmlFor='profilePic'>Foto de perfil</Label>
                    <Input
                        placeholder='Nombre'
                        id='profilePic'
                        value={pictureUrl!}
                        onChange={(event) => {
                            editImage(event.target.value);
                        }}
                    />
                </div>
                <div className=''>
                    <Label htmlFor='handle'>Handle</Label>
                    <Input
                        placeholder='Handle'
                        id='handle'
                        value={handle!}
                        onChange={(event) => {
                            editHandle(event.target.value);
                        }}
                    />
                </div>
            </div>
        </ToggleableCollapsible>
    );
};
