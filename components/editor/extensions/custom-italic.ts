import { Extension } from '@tiptap/core';
import { isTextItalic, toggleItalic } from '@/lib/unicodeFormatter';

const CustomItalic = Extension.create({
    name: 'customItalic',

    addKeyboardShortcuts() {
        return {
            'Mod-i': () => this.editor.commands.customItalic(),
        };
    },

    addCommands() {
        return {
            customItalic:
                () =>
                ({ tr, state, dispatch }) => {
                    console.log('customItalic');

                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );
                    const textCopy = selectedText;

                    console.log('selectedText', selectedText);

                    // Convert text
                    let convertedText = toggleItalic(selectedText);

                    console.log('selectedText after', textCopy);
                    console.log('convertedText', convertedText);

                    if (dispatch) {
                        dispatch(tr.insertText(convertedText));
                        return true;
                    }

                    return false;
                },

            isCustomItalic:
                () =>
                ({ tr, state, dispatch }) => {
                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );

                    return isTextItalic(selectedText);
                },
        };
    },
});

export default CustomItalic;
