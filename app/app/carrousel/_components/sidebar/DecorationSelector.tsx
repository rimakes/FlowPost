import { TDecorationId } from '@/types/types';
import { decorationMap } from '../Decoration';
import { Button } from '@/components/ui/button';
import { ToggleableCollapsible } from '@/components/shared/ToggleableCollapsible';

type DecorationSelectorProps = {
    onSelect: (decoration: TDecorationId) => void;
    selectedDecoration: TDecorationId;
};
export function DecorationSelector({
    onSelect,
    selectedDecoration,
}: DecorationSelectorProps) {
    return (
        <ToggleableCollapsible
            label='Elementos Decorativos'
            enabled={true}
            setEnabled={() => {}}
        >
            <div>
                {Object.keys(decorationMap).map((decoration, index) => {
                    return (
                        // @ts-ignore
                        <Button
                            onClick={() =>
                                onSelect(decoration as TDecorationId)
                            }
                            key={index}
                        >
                            {decoration}
                        </Button>
                    );
                })}
            </div>
        </ToggleableCollapsible>
    );
}
