'use client';

import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
    TBrand,
    TColorPalette,
    TFont,
    TFontName,
    TFontPalette,
} from '@/types/types';
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
import { BrandKitSelector } from './BrandKitSelector';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useSession } from 'next-auth/react';
import { fontTypeMap } from '@/config/const';

type CarouselSidebarProps = {
    brands: TBrand[];
};

export const CarouselSidebar = ({ brands }: CarouselSidebarProps) => {
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
                    <SideBarContent brands={brands} />
                </SheetContent>
            </Sheet>
            {/* DESKTOP SIDEBAR */}
            <SideBarContent brands={brands} className='hidden md:flex' />
        </>
    );
};

type SideBarContentProps = {
    className?: string;
    brands: TBrand[];
};

export const SideBarContent = ({ className, brands }: SideBarContentProps) => {
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
                colorPalette,
            },
        },
        setCarouselAspectRatio,
        toggleAlternateColors,
        setFontPalette,
        setDecorationId,
        setColorPalette,
        editProfilePicture,
        editName,
        editHandle,
    } = useContext(CarouselContext);

    const router = useRouter();
    const [colorsPopOverisOpen, setColorsPopOverisOpen] = useState(false);
    const { data } = useSession();

    const onSetColorPalette = (colorPalette: TColorPalette) => {
        setColorPalette(colorPalette);
        // setColorsPopOverisOpen(false);
    };

    const onBrandChange = (brandId: string) => {
        const brand = brands.find((brand) => brand.id === brandId);
        console.log(brand);
        if (brand) {
            setColorPalette(brand.colorPalette);
            setFontPalette(brand.fontPalette);
            editProfilePicture(brand.imageUrl);
            editName(brand.name);
            editHandle(brand.handle);
        }
    };

    const setFontByType = (fontType: TFont, font: TFontName) => {
        setFontPalette({
            ...carousel.settings.fontPalette,
            [fontType]: font,
        });
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
                {/* TODO: Recover this */}
                {/* <TemplateSelector /> */}
            </div>
            <Separator className='mt-2 mb-2' />
            <div className='flex flex-col gap-2'>
                <h3>Ajustes de marca</h3>
                <BrandKitSelector
                    brands={brands}
                    onBrandChange={onBrandChange}
                />
            </div>
            <Separator className='mt-2 mb-2' />

            <Collapsible>
                <CollapsibleTrigger className='flex justify-between w-full items-center'>
                    <div className='cursor-pointer flex items-center'>
                        Colores{' '}
                        <ColorPalette
                            colors={carousel.settings.colorPalette}
                            onClick={() => {}}
                            className='ml-2'
                        />
                    </div>
                    <ChevronsUpDown size={20} className='ml-2' />
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-4'>
                    <div className='p-2 border rounded-md border-dashed bg-gray-50'>
                        <ColorPaletteSelect
                            colorPalette={carousel.settings.colorPalette}
                            onChange={onSetColorPalette}
                        />
                        <div className='flex gap-2 items-center mt-2'>
                            <Label htmlFor='name'>Alternar colores</Label>
                            <Switch
                                checked={alternateColors}
                                onCheckedChange={toggleAlternateColors}
                            />
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Separator className='mt-2 mb-2' />
            <Collapsible>
                <CollapsibleTrigger className='flex justify-between w-full items-center'>
                    <div className='cursor-pointer flex items-center'>
                        Fuentes
                    </div>
                    <ChevronsUpDown size={20} className='ml-2' />
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-4'>
                    <FontPaletteSelector
                        fontPalette={carousel.settings.fontPalette}
                        setFontByType={setFontByType}
                    />
                </CollapsibleContent>
            </Collapsible>

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
                colorPalette={colorPalette}
            />
            <Separator className='mt-2 mb-2' />
            {/* <LabelRoundnessSelector /> */}
            {/* <Separator className='mt-2 mb-2' /> */}

            <div className='flex flex-col justify-between gap-2 mt-8'>
                <Button
                    onClick={async () => {
                        console.log(carousel);
                        console.log(carousel.author.pictureUrl);
                        const savedCarousel = await upsertCarousel(
                            carousel,
                            data?.user.id!
                        );
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

type FontPaletteSelectorProps = {
    fontPalette: TFontPalette;
    setFontByType: (fontType: TFont, font: TFontName) => void;
};

export const FontPaletteSelector = ({
    fontPalette,
    setFontByType,
}: FontPaletteSelectorProps) => {
    return (
        <div className='flex flex-col gap-4'>
            {Object.keys(fontPalette)
                .sort()
                .map((fontType) => (
                    <div
                        key={fontType}
                        className='cursor-pointer flex flex-col items-start'
                    >
                        {/*@ts-ignore  */}
                        {fontTypeMap[fontType]}
                        <FontSelector
                            font={fontPalette[fontType as TFont] as TFontName}
                            setFontPalette={(font: TFontName) =>
                                setFontByType(fontType as TFont, font)
                            }
                        />
                    </div>
                ))}
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
