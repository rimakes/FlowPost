import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TAspectRatioEnum } from '@/types/types';

type sizeSelectorProps = {
    aspectRatio: TAspectRatioEnum;
    setCarouselAspectRatio: (value: TAspectRatioEnum) => void;
};

export const SizeSelector = ({
    aspectRatio,
    setCarouselAspectRatio,
}: sizeSelectorProps) => {
    return (
        <Select
            value={aspectRatio}
            defaultValue={aspectRatio}
            onValueChange={(value: TAspectRatioEnum) => {
                setCarouselAspectRatio(value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder='Tamaño' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup></SelectGroup>
                <SelectItem value='PORTRAIT' className=''>
                    <div className='flex'>
                        Linkedin 4:5
                        <span className='ml-1 text-[10px] text-success-foreground'>
                            (Recomendado)
                        </span>
                    </div>
                </SelectItem>
                <SelectItem value='SQUARE' className=''>
                    <div className='flex'>Linkedin 1:1</div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};
