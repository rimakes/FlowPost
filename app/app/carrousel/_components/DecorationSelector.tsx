import { TDecorationId } from '@/types/types';
import { decorationMap } from './Decoration';
import { Button } from '@/components/ui/button';

type DecorationSelectorProps = {
    onSelect: (decoration: TDecorationId) => void;
    selectedDecoration: TDecorationId;
};
export function DecorationSelector({
    onSelect,
    selectedDecoration,
}: DecorationSelectorProps) {
    return (
        <div>
            {Object.keys(decorationMap).map((decoration, index) => {
                return (
                    // @ts-ignore
                    <Button onClick={() => onSelect(decoration)} key={index}>
                        {decoration}
                    </Button>
                );
            })}
        </div>
    );
}
