import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext } from 'react';
import { CarouselContext } from './ContextProvider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { colorPalettes } from '../../post-writter/_components/const';
import { DownloadButton } from './downloadButton';
import { Download } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

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
        setColorPalette,
    } = useContext(CarouselContext);
    return (
        <div className='sidebar basis-60 grow border-0 border-green-500 p-4'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <Label htmlFor='name'>Mostrar autor</Label>
                    <Switch
                        checked={showAuthor}
                        onCheckedChange={toggleShowAuthor}
                    />
                </div>
            </div>
            <Collapsible title='Apariencia'>
                <CollapsibleTrigger>Paleta de colores</CollapsibleTrigger>
                <CollapsibleContent>
                    <ColorPaletteSelect onChange={setColorPalette} />
                </CollapsibleContent>
            </Collapsible>

            <HoverCard openDelay={100}>
                <HoverCardTrigger className='cursor-pointer'>
                    Colores
                </HoverCardTrigger>
                <HoverCardContent>
                    <>
                        <ColorPaletteSelect onChange={setColorPalette} />
                        <div className='flex gap-2 items-center'>
                            <Label htmlFor='name'>Alternar colores</Label>
                            <Switch
                                checked={alternateColors}
                                onCheckedChange={toggleAlternateColors}
                            />
                        </div>
                    </>
                </HoverCardContent>
            </HoverCard>
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
            <DownloadButton />
        </div>
    );
};

type ColorPaletteSelectProps = {
    onChange: (colorPalette: TColorPalette) => void;
};

const ColorPaletteSelect = ({ onChange }: ColorPaletteSelectProps) => {
    return (
        <div className='w-full h-full grid grid-cols-3 gap-2'>
            {colorPalettes.map((palette, index) => (
                <ColorPalette
                    colors={{
                        font: palette.fontColor,
                        background: palette.backgroundColor,
                        accent: palette.accentColor,
                    }}
                    key={index}
                    onClick={onChange}
                />
            ))}
        </div>
    );
};

export type TColorPalette = {
    font: string;
    background: string;
    accent: string;
};

type ColorPaletteProps = {
    colors: TColorPalette;
    onClick: (colorPalette: TColorPalette) => void;
};

const ColorPalette = ({
    colors: { font, background, accent },
    onClick,
}: ColorPaletteProps) => {
    const colorClasses = 'w-1/3 h-full border-none outline-none';

    return (
        <div
            className='h-4 border rounded-l-md overflow-hidden rounded-r-md w-full flex'
            onClick={() => onClick({ font, background, accent })}
        >
            <div
                className={colorClasses}
                style={{
                    backgroundColor: font,
                }}
            ></div>
            <div
                className={colorClasses}
                style={{
                    backgroundColor: background,
                }}
            />
            <div
                className={colorClasses}
                style={{
                    backgroundColor: accent,
                }}
            />
        </div>
    );
};
