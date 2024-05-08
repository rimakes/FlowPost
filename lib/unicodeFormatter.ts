export const mathBoldMap = {
    A: '𝗔',
    B: '𝗕',
    C: '𝗖',
    Ç: '𝗖',
    D: '𝗗',
    E: '𝗘',
    Ë: '𝗘',
    F: '𝗙',
    G: '𝗚',
    H: '𝗛',
    I: '𝗜',
    J: '𝗝',
    K: '𝗞',
    L: '𝗟',
    M: '𝗠',
    N: '𝗡',
    O: '𝗢',
    P: '𝗣',
    Q: '𝗤',
    R: '𝗥',
    S: '𝗦',
    T: '𝗧',
    U: '𝗨',
    V: '𝗩',
    W: '𝗪',
    X: '𝗫',
    Y: '𝗬',
    Z: '𝗭',
    a: '𝗮',
    b: '𝗯',
    c: '𝗰',
    ç: '𝗰',
    d: '𝗱',
    e: '𝗲',
    ë: '𝗲',
    f: '𝗳',
    g: '𝗴',
    h: '𝗵',
    i: '𝗶',
    j: '𝗷',
    k: '𝗸',
    l: '𝗹',
    m: '𝗺',
    n: '𝗻',
    o: '𝗼',
    p: '𝗽',
    q: '𝗾',
    r: '𝗿',
    s: '𝘀',
    t: '𝘁',
    u: '𝘂',
    v: '𝘃',
    w: '𝘄',
    x: '𝘅',
    y: '𝘆',
    z: '𝘇',
    '0': '𝟬',
    '1': '𝟭',
    '2': '𝟮',
    '3': '𝟯',
    '4': '𝟰',
    '5': '𝟱',
    '6': '𝟲',
    '7': '𝟳',
    '8': '𝟴',
    '9': '𝟵',
};

type MathBoldMap = typeof mathBoldMap;
type MathBoldMapKeys = keyof typeof mathBoldMap;

const charBoldKeys = Object.keys(mathBoldMap);

const mathItalicMap = {
    A: '𝘈',
    B: '𝘉',
    C: '𝘊',
    Ç: '𝘊',
    D: '𝘋',
    E: '𝘌',
    Ë: '𝘌',
    F: '𝘍',
    G: '𝘎',
    H: '𝘏',
    I: '𝘐',
    J: '𝘑',
    K: '𝘒',
    L: '𝘓',
    M: '𝘔',
    N: '𝘕',
    O: '𝘖',
    P: '𝘗',
    Q: '𝘘',
    R: '𝘙',
    S: '𝘚',
    T: '𝘛',
    U: '𝘜',
    V: '𝘝',
    W: '𝘞',
    X: '𝘟',
    Y: '𝘠',
    Z: '𝘡',
    a: '𝘢',
    b: '𝘣',
    c: '𝘤',
    d: '𝘥',
    e: '𝘦',
    f: '𝘧',
    g: '𝘨',
    h: '𝘩',
    i: '𝘪',
    j: '𝘫',
    k: '𝘬',
    l: '𝘭',
    m: '𝘮',
    n: '𝘯',
    o: '𝘰',
    p: '𝘱',
    q: '𝘲',
    r: '𝘳',
    s: '𝘴',
    t: '𝘵',
    u: '𝘶',
    v: '𝘷',
    w: '𝘸',
    x: '𝘹',
    y: '𝘺',
    z: '𝘻',
    '0': '𝟢',
    '1': '𝟣',
    '2': '𝟤',
    '3': '𝟥',
    '4': '𝟦',
    '5': '𝟧',
    '6': '𝟨',
    '7': '𝟩',
    '8': '𝟪',
    '9': '𝟫',
};
const charItalicKeys = Object.keys(mathItalicMap);

type MathItalicMap = typeof mathItalicMap;
type MathItalicMapKeys = keyof typeof mathItalicMap;

export const mathBoldItalicMap = {
    A: '𝘼',
    B: '𝘽',
    C: '𝘾',
    Ç: '𝘾',
    D: '𝘿',
    E: '𝙀',
    Ë: '𝙀',
    F: '𝙁',
    G: '𝙂',
    H: '𝙃',
    I: '𝙄',
    J: '𝙅',
    K: '𝙆',
    L: '𝙇',
    M: '𝙈',
    N: '𝙉',
    O: '𝙊',
    P: '𝙋',
    Q: '𝙌',
    R: '𝙍',
    S: '𝙎',
    T: '𝙏',
    U: '𝙐',
    V: '𝙑',
    W: '𝙒',
    X: '𝙓',
    Y: '𝙔',
    Z: '𝙕',
    a: '𝙖',
    b: '𝙗',
    c: '𝙘',
    d: '𝙙',
    e: '𝙚',
    f: '𝙛',
    g: '𝙜',
    h: '𝙝',
    i: '𝙞',
    j: '𝙟',
    k: '𝙠',
    l: '𝙡',
    m: '𝙢',
    n: '𝙣',
    o: '𝙤',
    p: '𝙥',
    q: '𝙦',
    r: '𝙧',
    s: '𝙨',
    t: '𝙩',
    u: '𝙪',
    v: '𝙫',
    w: '𝙬',
    x: '𝙭',
    y: '𝙮',
    z: '𝙯',
    '0': '𝟬',
    '1': '𝟭',
    '2': '𝟮',
    '3': '𝟯',
    '4': '𝟰',
    '5': '𝟱',
    '6': '𝟲',
    '7': '𝟳',
    '8': '𝟴',
    '9': '𝟵',
};
const charBoldItalicKeys = Object.keys(mathBoldItalicMap);

type MathBoldItalicMap = typeof mathBoldItalicMap;
type MathBoldItalicMapKeys = keyof typeof mathBoldItalicMap;

/**
 * Toggles bold formatting using unicode "maps" for the selected text
 */
export function toggleBold(text: string) {
    let newText = '';
    if (isTextBold(text)) newText = removeBoldFormatting(text);
    else newText = applyBoldFormatting(text);

    return newText;
}

/**
 * Determines if the text is bold by checking if any characters are bold or bold-italic.
 */
export function isTextBold(text: string) {
    const arrayOfText = Array.from(text);

    const isBold = arrayOfText.some((char) => {
        return (
            Object.values(mathBoldMap).includes(char) ||
            Object.values(mathBoldItalicMap).includes(char)
        );
    });

    return isBold;
}

export const removeBoldFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Is the character a value in the bold-italic map? (aka is it bold-italic?)
            const originalCharBoldItalicKey = charBoldItalicKeys.find(
                (key) =>
                    mathBoldItalicMap[key as MathBoldItalicMapKeys] === char
            );

            // Is the character a value in the bold map? (aka is it bold?)
            const originalCharBoldKey = charBoldKeys.find(
                (key) => mathBoldMap[key as MathBoldMapKeys] === char
            );

            if (originalCharBoldItalicKey) {
                // Convert bold-italic to italic
                return (
                    mathItalicMap[
                        originalCharBoldItalicKey as MathItalicMapKeys
                    ] || char
                );
            } else if (originalCharBoldKey) {
                // Convert bold to normal
                return originalCharBoldKey || char;
            } else {
                return char; // Return the character unchanged if it's not bold or bold-italic
            }
        })
        .join('');
};

export const applyBoldFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            const originalChar = // fin the key whose value is the character
                // in the italic map
                charItalicKeys.find(
                    (key) => mathItalicMap[key as MathItalicMapKeys] === char
                ) ||
                // in the bold map
                charBoldKeys.find(
                    (key) => mathBoldMap[key as MathBoldMapKeys] === char
                ) ||
                char; // if it's not in either map, return the character unchanged
            const isItalic = Object.values(mathItalicMap).includes(char);
            if (isItalic) {
                // Convert italic to bold-italic
                return (
                    mathBoldItalicMap[originalChar as MathBoldItalicMapKeys] ||
                    char
                );
            } else {
                // Convert normal to bold
                return (
                    mathBoldMap[originalChar as MathBoldMapKeys] ||
                    mathBoldItalicMap[originalChar as MathBoldItalicMapKeys] ||
                    char
                );
            }
        })
        .join('');
};

/**
 * Toggles italic formatting using unicode "maps" for the selected text
 */
export function toggleItalic(text: string) {
    let newText = '';
    if (isTextItalic(text)) newText = removeItalicFormatting(text);
    else newText = applyItalicFormatting(text);

    return newText;
}

/**
 * Determines if the text is italic by checking if any characters are italic or bold-italic.
 */
export function isTextItalic(text: string) {
    const arrayOfText = Array.from(text);

    const isItalic = arrayOfText.some((char) => {
        return (
            Object.values(mathItalicMap).includes(char) ||
            Object.values(mathBoldItalicMap).includes(char)
        );
    });

    return isItalic;
}

export const removeItalicFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Is the character a value in the bold-italic map? (aka is it bold-italic?)
            const originalCharBoldItalicKey = charBoldItalicKeys.find(
                (key) =>
                    mathBoldItalicMap[key as MathBoldItalicMapKeys] === char
            );

            // Is the character a value in the italic map? (aka is it italic?)
            const originalCharItalicKey = charItalicKeys.find(
                (key) => mathItalicMap[key as MathItalicMapKeys] === char
            );

            if (originalCharBoldItalicKey) {
                // Convert bold-italic to bold
                return (
                    mathBoldMap[originalCharBoldItalicKey as MathBoldMapKeys] ||
                    char
                );
            } else if (originalCharItalicKey) {
                // Convert italic to normal
                return originalCharItalicKey || char;
            } else {
                return char; // Return the character unchanged if it's not italic or bold-italic
            }
        })
        .join('');
};

export const applyItalicFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            const originalChar = // find the key whose value is the character
                // in the bold map
                charBoldKeys.find(
                    (key) => mathBoldMap[key as MathBoldMapKeys] === char
                ) ||
                // in the italic map
                charItalicKeys.find(
                    (key) => mathItalicMap[key as MathItalicMapKeys] === char
                ) ||
                // in the bold-italic map
                charBoldItalicKeys.find(
                    (key) =>
                        mathBoldItalicMap[key as MathBoldItalicMapKeys] === char
                ) ||
                char; // if it's not in either map, return the character unchanged
            const isBold = Object.values(mathBoldMap).includes(char);
            if (isBold) {
                // Convert bold to bold-italic
                return (
                    mathBoldItalicMap[originalChar as MathBoldItalicMapKeys] ||
                    char
                );
            } else {
                // Convert normal to italic
                return (
                    mathItalicMap[originalChar as MathItalicMapKeys] ||
                    mathBoldItalicMap[originalChar as MathBoldItalicMapKeys] ||
                    char
                );
            }
        })
        .join('');
};

export function toggleStrikeThrough(text: string) {
    let newText = '';
    // Determine if the selected text has strikethrough by checking for the combining character
    const hasStrikethrough = text.includes('\u0336');

    if (hasStrikethrough) {
        // Remove strikethrough by removing only the combining strikethrough characters
        newText = text.replaceAll('\u0336', '');
    } else {
        // Apply strikethrough by adding the combining character after each character
        newText = Array.from(text)
            .map((char) => '\u0336' + char)
            .join('');
    }

    return newText;
}

export function isTextStrikeThrough(text: string) {
    return text.includes('\u0336');
}

export function toggleUnderline(text: string) {
    let newText = '';
    const underlineUnicode = '\u035f'; // Unicode character for underline
    const hasUnderline = text.includes(underlineUnicode);

    if (hasUnderline) {
        // Remove underline by removing only the combining underline characters
        newText = text.replaceAll(underlineUnicode, '');
    } else {
        // Apply underline by adding the combining character after each character
        newText = text
            .split('')
            .map((char) => char + underlineUnicode)
            .join('');
    }

    return newText;
}

export function isTextUnderlined(text: string) {
    return text.includes('\u035f');
}
