import { COLOR_PALETTES } from '@/app/app/post-writter/config/const';
import { TColorPalette } from '@/types/types';
import { ColorPalette } from './ColorPalette';

type ColorPaletteSelectProps = {
    onChange: (colorPalette: TColorPalette) => void;
};

export const ColorPaletteSelect = ({ onChange }: ColorPaletteSelectProps) => {
    return (
        <div className='w-full h-full grid grid-cols-3 gap-2'>
            {COLOR_PALETTES.map((palette, index) => (
                <ColorPalette
                    colors={{
                        font: palette.font,
                        background: palette.background,
                        accent: palette.accent,
                    }}
                    key={index}
                    onClick={onChange}
                />
            ))}
        </div>
    );
};
