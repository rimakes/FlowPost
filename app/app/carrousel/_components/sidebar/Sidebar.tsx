'use client';

import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { TColorPalette, TFontPallete } from '@/types/types';
import { FontSelector } from '@/components/shared/FontSelector';
import { ChevronsUpDown, Save } from 'lucide-react';
import { upsertCarousel } from '@/app/_actions/writter-actions';
import { toast } from 'sonner';
import { DecorationSelector } from './DecorationSelector';
import { useRouter } from 'next/navigation';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LoginButton } from '@/components/auth/login-button';
import { cn } from '@/lib/utils';
import { TemplateSelector } from './TemplateSelector';
import { DownloadButton } from './downloadButton';
import { ColorPaletteSelect } from './ColorPaletteSelector';
import { SizeSelector } from './SizeSelector';
import { AuthorSettings } from './AuthorSettings';
import { ColorPalette } from './ColorPalette';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { Slider } from '@/components/ui/slider';

export const CarouselSidebar = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <>
            {/* MOBILE SIDEBAR */}
            <div className='flex gap-8 w-full justify-between sm:justify-evenly p-4 md:hidden'>
                <Button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                    Opciones
                </Button>
                <LoginButton mode='modal'> Consigue PerBrand+ </LoginButton>
            </div>
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                <SheetContent side={'left'} className='md:hidden p-0 w-3/4'>
                    <SideBarContent />
                </SheetContent>
            </Sheet>
            {/* DESKTOP SIDEBAR */}
            <SideBarContent className='hidden md:block' />
        </>
    );
};

type SideBarContentProps = {
    className?: string;
};

export const SideBarContent = ({ className }: SideBarContentProps) => {
    const {
        carousel,
        carousel: {
            author: { name, handle, pictureUrl },
            settings: {
                alternateColors,
                showAuthor,
                aspectRatio,
                backgroundPattern,
                showSwipeLabel,
            },
        },
        setCarouselAspectRatio,
        toggleAlternateColors,
        setFontPalette,
        setDecorationId,
        setColorPalette,
        toggleShowSwipeLabel,
    } = useContext(CarouselContext);

    const router = useRouter();
    const [colorsPopOverisOpen, setColorsPopOverisOpen] = useState(false);
    const [fontPopOverisOpen, setFontPopOverisOpen] = useState(false);

    const onSetColorPalette = (colorPalette: TColorPalette) => {
        setColorPalette(colorPalette);
        setColorsPopOverisOpen(false);
    };

    const onSetFontPalette = (fontPalette: TFontPallete) => {
        setFontPalette(fontPalette);
        setFontPopOverisOpen(false);
    };

    return (
        <div
            className={cn(`sidebar basis-60 grow p-4 flex flex-col`, className)}
        >
            <div className='flex flex-col gap-2'>
                <h3>Plantilla</h3>
                <SizeSelector
                    aspectRatio={aspectRatio}
                    setCarouselAspectRatio={setCarouselAspectRatio}
                />
                <TemplateSelector />
            </div>
            <Separator className='mt-2 mb-2' />
            <Popover
                open={colorsPopOverisOpen}
                onOpenChange={setColorsPopOverisOpen}
            >
                <PopoverTrigger className='w-full flex items-center justify-between'>
                    <div className='cursor-pointer flex items-center'>
                        Colores{' '}
                        <ColorPalette
                            colors={carousel.settings.colorPalette}
                            onClick={() => {}}
                            className='ml-2'
                        />
                    </div>
                    <ChevronsUpDown size={20} className='ml-2' />
                </PopoverTrigger>
                <PopoverContent>
                    <>
                        <ColorPaletteSelect onChange={onSetColorPalette} />
                        <div className='flex gap-2 items-center'>
                            <Label htmlFor='name'>Alternar colores</Label>
                            <Switch
                                checked={alternateColors}
                                onCheckedChange={toggleAlternateColors}
                            />
                        </div>
                    </>
                </PopoverContent>
            </Popover>
            <Separator className='mt-2 mb-2' />
            <Popover
                open={fontPopOverisOpen}
                onOpenChange={setFontPopOverisOpen}
            >
                <PopoverTrigger className='w-full flex items-center justify-between'>
                    <div className='cursor-pointer flex gap-2 items-center'>
                        Fuente{' '}
                        <div
                            className='h-6 w-6 rounded-full'
                            style={{
                                fontFamily:
                                    carousel.settings.fontPalette.primary,
                            }}
                        >
                            {carousel.settings.fontPalette.primary}
                        </div>
                    </div>
                    <ChevronsUpDown size={20} className='ml-2' />
                </PopoverTrigger>
                <PopoverContent>
                    <>
                        <FontSelector
                            onSelect={(fontName) => {
                                console.log('fontName', fontName);
                                onSetFontPalette({
                                    handWriting: fontName,
                                    primary: fontName,
                                    secondary: fontName,
                                });
                            }}
                            selectedFont='Robotto'
                        />
                    </>
                </PopoverContent>
            </Popover>
            <Separator className='mt-2 mb-2' />
            <AuthorSettings />
            <Separator className='mt-2 mb-2' />
            <DecorationSelector
                onSelect={(decoration) => {
                    console.log('decoration', decoration);
                    setDecorationId(decoration);
                }}
                // @ts-ignore
                selectedDecoration={backgroundPattern}
            />
            <Separator className='mt-2 mb-2' />
            <LabelRoundnessSelector />
            <Separator className='mt-2 mb-2' />
            <div className='flex flex-col justify-between gap-2 mt-auto'>
                <Button
                    onClick={async () => {
                        const savedCarousel = await upsertCarousel(carousel);
                        toast.success('Carrusel Guardado!');
                        router.push(`/app/carrousel/${savedCarousel.id}`);
                    }}
                    variant={'secondary'}
                >
                    Guardar
                    <Save size={20} className='ml-2' />
                </Button>
                <DownloadButton />
            </div>
        </div>
    );
};

export const LabelRoundnessSelector = () => {
    const {
        carousel: {
            settings: { labelRoundness, showSwipeLabel },
        },
        toggleShowSwipeLabel,
        setLabelRoundness,
    } = useContext(CarouselContext);

    return (
        <ToggleableCollapsible
            enabled={showSwipeLabel}
            setEnabled={toggleShowSwipeLabel}
            label='Etiqueta desliza'
        >
            <div className='flex gap-2'>
                <Label>Redondeo</Label>
                <Slider
                    min={0}
                    max={20}
                    step={0.1}
                    value={[labelRoundness]}
                    onValueChange={(value) => {
                        setLabelRoundness(value[0]);
                    }}
                />
            </div>
        </ToggleableCollapsible>
    );
};
