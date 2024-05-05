'use client';

import { useContext, useState } from 'react';
import { ChevronsUpDown, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toCanvas } from 'html-to-image';
import { CarouselContext } from '../CarouselProvider';
import { DecorationSelector } from './DecorationSelector';
import { DownloadButton } from './downloadButton';
import { ColorPaletteSelect } from './ColorPaletteSelector';
import { SizeSelector } from './SizeSelector';
import { AuthorSettings } from './AuthorSettings';
import { ColorPalette } from './ColorPalette';
import { BrandKitSelector } from './BrandKitSelector';
import { ContinueButton } from './ContinueButton';
import { Label } from '@/components/ui/label';
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
import { upsertCarousel } from '@/app/_actions/carousel-actions';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LoginButton } from '@/components/auth/LoginButton';
import { cn } from '@/lib/utils';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';
import { Slider } from '@/components/ui/slider';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { fontTypeMap } from '@/config/const';
import { appConfig } from '@/config/shipper.appconfig';
import { Input } from '@ui/input';
import { revalidateAllPaths } from '@/app/_actions/other-actions';

type CarouselSidebarProps = {
    brands: TBrand[];
};

export const CarouselSidebar = ({ brands }: CarouselSidebarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <>
            {/* MOBILE SIDEBAR */}
            <div className='flex w-full justify-between gap-8 p-4 sm:justify-evenly md:hidden'>
                <Button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                    Opciones
                </Button>
                <LoginButton mode='modal'>
                    {`Consigue ${appConfig.general.appName}`}
                </LoginButton>
            </div>
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                <SheetContent
                    side={'left'}
                    className='max-h-full w-3/4 overflow-y-auto p-0 md:hidden'
                >
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
            settings: {
                alternateColors,
                aspectRatio,
                backgroundPattern,
                colorPalette,
            },
        },
        toggleCarouselSetting: toggleCarouselSetting,
        setCarouselSetting,
        editProfilePicture,
        editName,
        editHandle,
        setCarouselContent,
        arrayOfRefs,
    } = useContext(CarouselContext);

    const router = useRouter();
    const { data } = useSession();

    const onSetColorPalette = (colorPalette: TColorPalette) => {
        setCarouselSetting('colorPalette', colorPalette);
        // setColorsPopOverisOpen(false);
    };

    const onBrandChange = (brandId: string) => {
        const brand = brands.find((brand) => brand.id === brandId);
        if (brand) {
            setCarouselSetting('colorPalette', brand.colorPalette);
            setCarouselSetting('fontPalette', brand.fontPalette);
            editProfilePicture(brand.imageUrl);
            editName(brand.name);
            editHandle(brand.handle);
        }
    };

    const setFontByType = (fontType: TFont, font: TFontName) => {
        setCarouselSetting('fontPalette', {
            ...carousel.settings.fontPalette,
            [fontType]: font,
        });
    };

    return (
        <div
            className={cn(`sidebar flex grow basis-60 flex-col p-4`, className)}
        >
            <div className=''>
                <h3>Título</h3>
                <Input
                    value={carousel.title!}
                    onChange={(e) => {
                        setCarouselContent('title', e.target.value);
                    }}
                />
            </div>
            <Separator className='mb-2 mt-2' />
            <div className='flex flex-col gap-2'>
                <h3>Plantilla</h3>
                <SizeSelector
                    aspectRatio={aspectRatio}
                    setCarouselAspectRatio={(newValue) => {
                        setCarouselSetting('aspectRatio', newValue);
                    }}
                />
                {/* TODO: Recover this */}
                {/* <TemplateSelector /> */}
            </div>
            <Separator className='mb-2 mt-2' />
            <div className='flex flex-col gap-2'>
                <h3>Ajustes de marca</h3>
                <BrandKitSelector
                    brands={brands}
                    onBrandChange={onBrandChange}
                />
            </div>
            <Separator className='mb-2 mt-2' />

            <Collapsible>
                <CollapsibleTrigger className='flex w-full items-center justify-between'>
                    <div className='flex cursor-pointer items-center'>
                        Colores
                        <ColorPalette
                            colors={carousel.settings.colorPalette}
                            onClick={() => {}}
                            className='ml-2'
                        />
                    </div>
                    <ChevronsUpDown size={20} className='ml-2' />
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-4 '>
                    <div className='flex flex-col gap-4 rounded-md border border-dashed bg-gray-50 p-2 '>
                        <ColorPaletteSelect
                            colorPalette={carousel.settings.colorPalette}
                            onChange={onSetColorPalette}
                        />
                        <div className='mt-2 flex items-center gap-2'>
                            <Label htmlFor='name'>Alternar colores</Label>
                            <Switch
                                checked={alternateColors}
                                onCheckedChange={() => {
                                    toggleCarouselSetting('alternateColors');
                                }}
                            />
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Separator className='mb-2 mt-2' />
            <Collapsible>
                <CollapsibleTrigger className='flex w-full items-center justify-between'>
                    <div className='flex cursor-pointer items-center'>
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

            <Separator className='mb-2 mt-2' />
            <AuthorSettings />
            <Separator className='mb-2 mt-2' />
            <DecorationSelector
                onSelect={(decoration) => {
                    setCarouselSetting('backgroundPattern', decoration);
                }}
                // @ts-ignore
                selectedDecoration={backgroundPattern}
                colorPalette={colorPalette}
            />
            <Separator className='mb-2 mt-2' />
            {/* <LabelRoundnessSelector /> */}
            {/* <Separator className='mt-2 mb-2' /> */}

            <div className='mt-8 flex flex-col justify-between gap-2'>
                <Button
                    onClick={async () => {
                        const canvas = await toCanvas(arrayOfRefs[0].current!);
                        const dataUrl = canvas.toDataURL();

                        setCarouselContent('thumbnailDataUrl', dataUrl);

                        const savedCarousel = await upsertCarousel(
                            { ...carousel, thumbnailDataUrl: dataUrl },
                            data?.user.id!
                        );
                        revalidateAllPaths();
                        toast.success('Carrusel Guardado!');
                        router.push(`/app/carrousel/${savedCarousel.id}`);
                    }}
                    variant={'secondary'}
                >
                    Guardar
                    <Save size={20} className='ml-2' />
                </Button>
                <DownloadButton />
                <ContinueButton />
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
            {Object.keys(fontPalette).map((fontType) => (
                <div
                    key={fontType}
                    id={fontType}
                    className='flex cursor-pointer flex-col items-start'
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
        toggleCarouselSetting: toggleCarouselSetting,
        setCarouselSetting,
    } = useContext(CarouselContext);

    return (
        <ToggleableCollapsible
            enabled={showSwipeLabel}
            setEnabled={() => toggleCarouselSetting('showSwipeLabel')}
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
                        setCarouselSetting('labelRoundness', value[0]);
                    }}
                />
            </div>
        </ToggleableCollapsible>
    );
};
