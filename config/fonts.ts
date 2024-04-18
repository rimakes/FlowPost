// Find more fonts at https://fonts.google.com/?vfonly=true

import {
    Bricolage_Grotesque,
    Inter,
    Shantell_Sans,
    Caveat,
} from 'next/font/google';
import {
    Sofia,
    Montserrat,
    Raleway,
    Playfair_Display,
    Work_Sans,
    Lora,
    Mulish,
    Quicksand,
    Manrope,
    Josefin_Sans,
    Dosis,
    Bitter,
    Jost,
    Dancing_Script,
    ABeeZee,
    Abel,
    Abhaya_Libre,
    Abril_Fatface,
    Aclonica,
    Acme,
    Actor,
    Adamina,
    Advent_Pro,
    Aguafina_Script,
    Akaya_Kanadaka,
    Akaya_Telivigala,
    Akronim,
    Aladin,
    Alata,
    Alatsi,
    Aldrich,
    Alef,
    Alegreya,
    Alegreya_SC,
    Alegreya_Sans,
    Alegreya_Sans_SC,
    Aleo,
    Alex_Brush,
} from 'next/font/google';

export const primaryFont = Inter({ subsets: ['latin'] });

export const secondaryFont = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
    adjustFontFallback: false,
});

export const handwritten = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat    ',
    display: 'swap',
    weight: ['400'],
});

// ### FONTS I LIKE ###
// ### HANDWRITTEN
// Indie Flower
// Caveat

// FONTS FOR THE USER
//ketan
export const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
    preload: false,
    adjustFontFallback: false,
});
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
    preload: false,
});

export const sofia = Sofia({
    subsets: ['latin'],
    variable: '--font-sofia',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'auto',
    preload: false,
});

export const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
    display: 'auto',
    preload: false,
});

export const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
    display: 'auto',
    preload: false,
});

export const workSans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-work-sans',
    display: 'auto',
    preload: false,
});

export const lora = Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'auto',
    preload: false,
});

export const mulish = Mulish({
    subsets: ['latin'],
    variable: '--font-mulish',
    display: 'auto',
    preload: false,
});

export const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'auto',
    preload: false,
});

export const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    display: 'auto',
    preload: false,
});

export const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    variable: '--font-josefin-sans',
    display: 'auto',
    preload: false,
});

export const dosis = Dosis({
    subsets: ['latin'],
    variable: '--font-dosis',
    display: 'auto',
    preload: false,
});

export const bitter = Bitter({
    subsets: ['latin'],
    variable: '--font-bitter',
    display: 'auto',
    preload: false,
});

export const jost = Jost({
    subsets: ['latin'],
    variable: '--font-jost',
    display: 'auto',
    preload: false,
});

export const dancingScript = Dancing_Script({
    subsets: ['latin'],
    variable: '--font-dancing-script',
    display: 'auto',
    preload: false,
});

// MORE FONTS

export const aBeeZee = ABeeZee({
    subsets: ['latin'],
    variable: '--font-abeezee',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const abel = Abel({
    subsets: ['latin'],
    variable: '--font-abel',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const abhayaLibre = Abhaya_Libre({
    subsets: ['latin'],
    variable: '--font-abhaya-libre',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const abrilFatface = Abril_Fatface({
    subsets: ['latin'],
    variable: '--font-abril-fatface',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const aclonica = Aclonica({
    subsets: ['latin'],
    variable: '--font-aclonica',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const acme = Acme({
    subsets: ['latin'],
    variable: '--font-acme',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const actor = Actor({
    subsets: ['latin'],
    variable: '--font-actor',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const adamina = Adamina({
    subsets: ['latin'],
    variable: '--font-adamina',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const adventPro = Advent_Pro({
    subsets: ['latin'],
    variable: '--font-advent-pro',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const aguafinaScript = Aguafina_Script({
    subsets: ['latin'],
    variable: '--font-aguafina-script',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const akayaKanadaka = Akaya_Kanadaka({
    subsets: ['latin'],
    variable: '--font-akaya-kanadaka',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const akayaTelivigala = Akaya_Telivigala({
    subsets: ['latin'],
    variable: '--font-akaya-telivigala',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const akronim = Akronim({
    subsets: ['latin'],
    variable: '--font-akronim',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const aladin = Aladin({
    subsets: ['latin'],
    variable: '--font-aladin',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alata = Alata({
    subsets: ['latin'],
    variable: '--font-alata',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alatsi = Alatsi({
    subsets: ['latin'],
    variable: '--font-alatsi',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const aldrich = Aldrich({
    subsets: ['latin'],
    variable: '--font-aldrich',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alef = Alef({
    subsets: ['latin'],
    variable: '--font-alef',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

// write the export of the next 10 fonts

export const alegreya = Alegreya({
    subsets: ['latin'],
    variable: '--font-alegreya',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alegreyaSC = Alegreya_SC({
    subsets: ['latin'],
    variable: '--font-alegreya-sc',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alegreyaSans = Alegreya_Sans({
    subsets: ['latin'],
    variable: '--font-alegreya-sans',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alegreyaSansSC = Alegreya_Sans_SC({
    subsets: ['latin'],
    variable: '--font-alegreya-sans-sc',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const aleo = Aleo({
    subsets: ['latin'],
    variable: '--font-aleo',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const alexBrush = Alex_Brush({
    subsets: ['latin'],
    variable: '--font-alex-brush',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const fontsMap = {
    bricolage: secondaryFont,
    inter: primaryFont,
    Shantell_Sans: handwritten,
    sofia,
    montserrat,
    raleway,
    playfairDisplay,
    workSans,
    lora,
    mulish,
    quicksand,
    manrope,
    josefinSans,
    dosis,
    bitter,
    jost,
    dancingScript,
    aBeeZee,
    abel,
    abhayaLibre,
    abrilFatface,
    aclonica,
    acme,
    actor,
    adamina,
    adventPro,
    aguafinaScript,
    akayaKanadaka,
    akayaTelivigala,
    akronim,
    aladin,
    alata,
    alatsi,
    aldrich,
    alef,
    alegreya,
    alegreyaSC,
    alegreyaSans,
    alegreyaSansSC,
    aleo,
    alexBrush,
} as const;
