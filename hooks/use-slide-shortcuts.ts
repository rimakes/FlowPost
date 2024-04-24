import { useEffect } from 'react';

type TShortcutsMap = {
    [key: string]: () => void;
};

export const useCarouselShortcuts = (shortcutsMap: TShortcutsMap) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // If focus in the child of the slide, we don't want to trigger the shortcuts. The slide has a class name of "slide". Use that to prevent the event from triggering.
            // TODO: Not sure this is the best way to do this. Maybe we should use a ref to the slide and check if the event target is the slide.
            if (
                event.target instanceof HTMLElement &&
                event.target.closest('.slide')
            )
                return;

            for (const key in shortcutsMap) {
                if (event.key === key) shortcutsMap[key]();
            }

            // if (event.key === 'ArrowRight') nextSlide();
            // if (event.key === 'ArrowLeft') previousSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcutsMap]);
};
