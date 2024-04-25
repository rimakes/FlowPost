import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

type ToggleableCollapsibleProps = {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    label: string;
    children: React.ReactNode;
};

export const ToggleableCollapsible = ({
    enabled,
    setEnabled,
    label,
    children,
}: ToggleableCollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen && enabled}
            onOpenChange={(open) => {
                if (!enabled) return;
                setIsOpen(open);
            }}
        >
            <CollapsibleTrigger asChild>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Switch
                            className='scale-75'
                            checked={enabled}
                            onCheckedChange={(value) => {
                                setEnabled(value);
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        />
                        <Label htmlFor='name'>{label}</Label>
                    </div>
                    <ChevronsUpDown
                        size={20}
                        className='ml-2'
                        style={{
                            opacity: enabled ? 1 : 0,
                        }}
                    />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className='py-4'>{children}</CollapsibleContent>
        </Collapsible>
    );
};
