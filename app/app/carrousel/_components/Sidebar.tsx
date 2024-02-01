import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext } from 'react';
import { CarouselContext } from './ContextProvider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export const CarouselSidebar = () => {
    const {
        carousel: {
            authorName,
            authorHandle,
            authorPictureUrl,
            settings: {
                alternateColors,
                showCounter,
                showSwipeLabel,
                showAuthor,
            },
        },
        toggleAlternateColors,
        editImage,
        editName,
        editHandle,
        toggleShowCounter,
        toggleShowSwipeLabel,
        toggleShowAuthor,
    } = useContext(CarouselContext);
    return (
        <div className='sidebar basis-60 grow border-0 border-green-500 p-4'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <Label htmlFor='name'>Alternar colores</Label>
                    <Switch
                        checked={alternateColors}
                        onCheckedChange={toggleAlternateColors}
                    />
                </div>
                <div className='flex gap-2 items-center'>
                    <Label htmlFor='name'>Mostrar autor</Label>
                    <Switch
                        checked={showAuthor}
                        onCheckedChange={toggleShowAuthor}
                    />
                </div>
            </div>
            <Separator className='mt-2 mb-2' />
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
                        value={authorName!}
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
                        value={authorPictureUrl!}
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
                        value={authorHandle!}
                        onChange={(event) => {
                            editHandle(event.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
