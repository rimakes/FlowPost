import '@tiptap/core';
// REVIEW: Why do I have to import these functions here? (otherwise the types are not recognized)

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customExtension: {
            customBold: () => ReturnType;
            customNormal: () => ReturnType;
            customItalic: () => ReturnType;
            customStrikeThrough: () => ReturnType;
            customUnderline: () => ReturnType;
            isCustomBold: () => ReturnType;
            isCustomItalic: () => ReturnType;
            isStrikeThrough: () => ReturnType;
            isTextUnderline: () => ReturnType;
        };
    }
}
