import { Extension } from '@tiptap/core';
import { isTextUnderlined, toggleUnderline } from '@/lib/unicodeFormatter';
// import { sansSerif } from 'weird-fonts';

const CustomUnderline = Extension.create({
    name: 'CustomUnderline',
    addKeyboardShortcuts() {
        return {
            'Mod-s': () => this.editor.commands.customUnderline(),
        };
    },
    addCommands() {
        return {
            customUnderline:
                () =>
                ({ tr, state, dispatch }) => {
                    console.log('customUnderline');

                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );
                    const textCopy = selectedText;

                    console.log('selectedText', selectedText);

                    // Convert text
                    let convertedText = toggleUnderline(selectedText);

                    console.log('selectedText after', textCopy);
                    console.log('convertedText', convertedText);

                    if (dispatch) {
                        dispatch(tr.insertText(convertedText));
                        return true;
                    }

                    return false;
                },

            isTextUnderline:
                () =>
                ({ tr, state, dispatch }) => {
                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );

                    return isTextUnderlined(selectedText);
                },
        };
    },
});

export default CustomUnderline;
