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

export const circledMap = {
    A: 'Ⓐ',
    B: 'Ⓑ',
    C: 'Ⓒ',
    Ç: 'Ⓒ',
    D: 'Ⓓ',
    E: 'Ⓔ',
    Ë: 'Ⓔ',
    F: 'Ⓕ',
    G: 'Ⓖ',
    H: 'Ⓗ',
    I: 'Ⓘ',
    J: 'Ⓙ',
    K: 'Ⓚ',
    L: 'Ⓛ',
    M: 'Ⓜ',
    N: 'Ⓝ',
    O: 'Ⓞ',
    P: 'Ⓟ',
    Q: 'Ⓠ',
    R: 'Ⓡ',
    S: 'Ⓢ',
    T: 'Ⓣ',
    U: 'Ⓤ',
    V: 'Ⓥ',
    W: 'Ⓦ',
    X: 'Ⓧ',
    Y: 'Ⓨ',
    Z: 'Ⓩ',
    a: 'ⓐ',
    b: 'ⓑ',
    c: 'ⓒ',
    d: 'ⓓ',
    e: 'ⓔ',
    f: 'ⓕ',
    g: 'ⓖ',
    h: 'ⓗ',
    i: 'ⓘ',
    j: 'ⓙ',
    k: 'ⓚ',
    l: 'ⓛ',
    m: 'ⓜ',
    n: 'ⓝ',
    o: 'ⓞ',
    p: 'ⓟ',
    q: 'ⓠ',
    r: 'ⓡ',
    s: 'ⓢ',
    t: 'ⓣ',
    u: 'ⓤ',
    v: 'ⓥ',
    w: 'ⓦ',
    x: 'ⓧ',
    y: 'ⓨ',
    z: 'ⓩ',
    '0': '⓪',
    '1': '①',
    '2': '②',
    '3': '③',
    '4': '④',
    '5': '⑤',
    '6': '⑥',
    '7': '⑦',
    '8': '⑧',
    '9': '⑨',
};

export const squareMap = {
    A: '🄰',
    B: '🄱',
    C: '🄲',
    D: '🄳',
    E: '🄴',
    F: '🄵',
    G: '🄶',
    H: '🄷',
    I: '🄸',
    J: '🄹',
    K: '🄺',
    L: '🄻',
    M: '🄼',
    N: '🄽',
    O: '🄾',
    P: '🄿',
    Q: '🅀',
    R: '🅁',
    S: '🅂',
    T: '🅃',
    U: '🅄',
    V: '🅅',
    W: '🅆',
    X: '🅇',
    Y: '🅈',
    Z: '🅉',
    a: '🄰',
    b: '🄱',
    c: '🄲',
    d: '🄳',
    e: '🄴',
    f: '🄵',
    g: '🄶',
    h: '🄷',
    i: '🄸',
    j: '🄹',
    k: '🄺',
    l: '🄻',
    m: '🄼',
    n: '🄽',
    o: '🄾',
    p: '🄿',
    q: '🅀',
    r: '🅁',
    s: '🅂',
    t: '🅃',
    u: '🅄',
    v: '🅅',
    w: '🅆',
    x: '🅇',
    y: '🅈',
    z: '🅉',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
};

export const invertedMap = {
    A: '∀',
    B: '𐐒',
    C: 'Ɔ',
    D: 'ᗡ',
    E: 'Ǝ',
    F: 'Ⅎ',
    G: 'Ǥ',
    H: 'H', // no exact inverted 'H'
    I: 'I',
    J: 'ſ', // J isn't available in Unicode, so using 'long s' as an alternative
    K: 'ꓘ',
    L: '⅂',
    M: 'W', // no exact inverted 'M', using upside down 'W'
    N: 'N',
    O: 'O',
    P: 'Ԁ',
    Q: 'Ὸ',
    R: 'ꓤ',
    S: 'S', // no exact inverted 'S'
    T: '⊥',
    U: '∩',
    V: 'Λ',
    W: 'M', // no exact inverted 'W', using upside down 'M'
    X: 'X',
    Y: '⅄',
    Z: 'Z', // no exact inverted 'Z'
    // Lowercase
    a: 'ɐ',
    b: 'q', // no exact inverted 'b', using upside down 'q'
    c: 'c', // no exact inverted 'c'
    d: 'p', // no exact inverted 'd', using upside down 'p'
    e: 'ǝ',
    f: 'ɟ',
    g: 'ƃ',
    h: 'ɥ',
    i: 'ᴉ',
    j: 'ɾ', // no exact inverted 'j', using upside down 'r'
    k: 'ʞ',
    l: 'ן',
    m: 'ɯ',
    n: 'u', // no exact inverted 'n', using upside down 'u'
    o: 'o',
    p: 'd', // no exact inverted 'p', using upside down 'd'
    q: 'b', // no exact inverted 'q', using upside down 'b'
    r: 'ɹ',
    s: 's', // no exact inverted 's'
    t: 'ʇ',
    u: 'n', // no exact inverted 'u', using upside down 'n'
    v: 'ʌ',
    w: 'ʍ',
    x: 'x', // no exact inverted 'x'
    y: 'ʎ',
    z: 'z', // no exact inverted 'z'
    // Only symbolic numbers available
    '0': '0',
    '1': 'Ɩ',
    '2': 'Շ',
    '3': 'Ɛ',
    '4': 'h',
    '5': 'S', // no symbolic inverted 5, using normal 'S' as a placeholder
    '6': '9',
    '7': 'L', // no symbolic inverted 7, using normal 'L' as a placeholder
    '8': '8',
    '9': '6',
};

const charInvertedKeys = Object.keys(invertedMap);
type InvertedMap = typeof invertedMap;
type InvertedMapKeys = keyof typeof invertedMap;

/**
 * Toggles "inverted" formatting using unicode "maps" for the selected text
 */
export function toggleInverted(text: string) {
    let newText = '';
    if (isTextInverted(text)) newText = removeInvertedFormatting(text);
    else newText = applyInvertedFormatting(text);

    return newText;
}

/**
 * Determines if the text is inverted by checking if any characters are inverted.
 */
export function isTextInverted(text: string) {
    const arrayOfText = Array.from(text);

    const isInverted = arrayOfText.some((char) => {
        return Object.values(invertedMap).includes(char);
    });

    return isInverted;
}

export const removeInvertedFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Is the character a value in the inverted map? (aka is it inverted?)
            const originalCharInvertedKey = charInvertedKeys.find(
                (key) => invertedMap[key as InvertedMapKeys] === char
            );

            // Convert inverted to normal
            return originalCharInvertedKey || char;
        })
        .join('');
};

export const applyInvertedFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Convert normal to inverted
            return invertedMap[char as InvertedMapKeys] || char;
        })
        .join('');
};

const charSquareKeys = Object.keys(squareMap);
type SquareMap = typeof squareMap;
type SquareMapKeys = keyof typeof squareMap;

const charCircleKeys = Object.keys(circledMap);

type CircledMap = typeof circledMap;
type CircledMapKeys = keyof typeof circledMap;

/**
 * Toggles "square" formatting using unicode "maps" for the selected text
 */
export function toggleSquare(text: string) {
    let newText = '';
    if (isTextSquare(text)) newText = removeSquareFormatting(text);
    else newText = applySquareFormatting(text);

    return newText;
}

/**
 * Determines if the text is inside square by checking if any characters are inside square.
 */
export function isTextSquare(text: string) {
    const arrayOfText = Array.from(text);

    const isSquare = arrayOfText.some((char) => {
        return Object.values(squareMap).includes(char);
    });

    return isSquare;
}

export const removeSquareFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Is the character a value in the square map? (aka is it square?)
            const originalCharSquareKey = charSquareKeys.find(
                (key) => squareMap[key as SquareMapKeys] === char
            );

            // Convert square to normal
            return originalCharSquareKey || char;
        })
        .join('');
};

export const applySquareFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Convert normal to square
            return squareMap[char as SquareMapKeys] || char;
        })
        .join('');
};

/**
 * Toggles "circled" formatting using unicode "maps" for the selected text
 */
export function toggleCircled(text: string) {
    let newText = '';
    if (isTextCircled(text)) newText = removeCircledFormatting(text);
    else newText = applyCircledFormatting(text);

    return newText;
}

/**
 * Determines if the text is inside circle by checking if any characters are inside circle.
 */
export function isTextCircled(text: string) {
    const arrayOfText = Array.from(text);

    const isCircled = arrayOfText.some((char) => {
        return Object.values(circledMap).includes(char);
    });

    return isCircled;
}

export const removeCircledFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Is the character a value in the circled map? (aka is it circled?)
            const originalCharCircleKey = charCircleKeys.find(
                (key) => circledMap[key as CircledMapKeys] === char
            );

            // Convert circled to normal
            return originalCharCircleKey || char;
        })
        .join('');
};

export const applyCircledFormatting = (text: string) => {
    return Array.from(text)
        .map((char) => {
            // Convert normal to circled
            return circledMap[char as CircledMapKeys] || char;
        })
        .join('');
};

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
