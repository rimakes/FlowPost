import { Extension } from '@tiptap/core';
import {
    isTextStrikeThrough,
    toggleStrikeThrough,
} from '@/lib/unicodeFormatter';
// import { sansSerif } from 'weird-fonts';

const CustomStrikeThrough = Extension.create({
    name: 'CustomStrikeThrough',
    addKeyboardShortcuts() {
        return {
            'Mod-s': () => this.editor.commands.customStrikeThrough(),
        };
    },
    addCommands() {
        return {
            customStrikeThrough:
                () =>
                ({ tr, state, dispatch }) => {
                    console.log('customStrikeThrough');

                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );
                    const textCopy = selectedText;

                    console.log('selectedText', selectedText);

                    // Convert text
                    let convertedText = toggleStrikeThrough(selectedText);

                    console.log('selectedText after', textCopy);
                    console.log('convertedText', convertedText);

                    if (dispatch) {
                        dispatch(tr.insertText(convertedText));
                        return true;
                    }

                    return false;
                },

            isStrikeThrough:
                () =>
                ({ tr, state, dispatch }) => {
                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );

                    return isTextStrikeThrough(selectedText);
                },
        };
    },
});

export default CustomStrikeThrough;
