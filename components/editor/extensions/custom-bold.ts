import { Extension } from '@tiptap/core';
import { isTextBold, toggleBold } from '@/lib/unicodeFormatter';
// import { sansSerif } from 'weird-fonts';

const CustomBold = Extension.create({
    name: 'CustomBold',

    addKeyboardShortcuts() {
        return {
            'Mod-b': () => this.editor.commands.customBold(),
        };
    },

    addCommands() {
        return {
            customBold:
                () =>
                ({ tr, state, dispatch }) => {
                    console.log('customBold');

                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );
                    const textCopy = selectedText;

                    console.log('selectedText', selectedText);

                    // Convert text
                    let convertedText = toggleBold(selectedText);

                    console.log('selectedText after', textCopy);
                    console.log('convertedText', convertedText);

                    if (dispatch) {
                        dispatch(tr.insertText(convertedText));
                        return true;
                    }

                    return false;
                },
            isCustomBold:
                () =>
                ({ tr, state, dispatch }) => {
                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );

                    return isTextBold(selectedText);
                },
        };
    },
});

export default CustomBold;
