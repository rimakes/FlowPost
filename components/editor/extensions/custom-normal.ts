import { Extension } from '@tiptap/core';
import { sansSerif } from 'weird-fonts';

const CustomNormal = Extension.create({
    name: 'CustomNormal',

    addCommands() {
        return {
            customNormal:
                () =>
                ({ tr, state, dispatch }) => {
                    // Get selected text
                    const selectedText = state.doc.textBetween(
                        state.selection.from,
                        state.selection.to
                    );
                    const textCopy = selectedText;

                    // Convert text
                    let convertedText = sansSerif(selectedText, {
                        fontStyle: 'normal',
                    });

                    if (selectedText === convertedText) {
                        let convertedText2 = sansSerif(selectedText, {
                            fontStyle: 'italic',
                        });
                    }

                    if (dispatch) {
                        dispatch(tr.insertText(convertedText));
                        return true;
                    }

                    return false;
                },
        };
    },
});

export default CustomNormal;
