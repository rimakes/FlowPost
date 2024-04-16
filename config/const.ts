import { TMenuItem } from '@/types/types';
import { Brand } from '@prisma/client';
import {
    CalendarCheck,
    GalleryHorizontal,
    Lightbulb,
    Paperclip,
    Settings,
    Sparkles,
} from 'lucide-react';

export enum TimeOfTheDay {
    T0900 = '09:00 AM',
    T0915 = '09:15 AM',
    T0930 = '09:30 AM',
    T0945 = '09:45 AM',
    T1000 = '10:00 AM',
    T1015 = '10:15 AM',
    T1030 = '10:30 AM',
    T1045 = '10:45 AM',
    T1100 = '11:00 AM',
    T1115 = '11:15 AM',
    T1130 = '11:30 AM',
    T1145 = '11:45 AM',
    T1200 = '12:00 PM',
    T1215 = '12:15 PM',
    T1230 = '12:30 PM',
    T1245 = '12:45 PM',
    T1300 = '01:00 PM',
    T1315 = '01:15 PM',
    T1330 = '01:30 PM',
    T1345 = '01:45 PM',
    T1400 = '02:00 PM',
    T1415 = '02:15 PM',
    T1430 = '02:30 PM',
    T1445 = '02:45 PM',
    T1500 = '03:00 PM',
    T1515 = '03:15 PM',
    T1530 = '03:30 PM',
    T1545 = '03:45 PM',
    T1600 = '04:00 PM',
    T1615 = '04:15 PM',
    T1630 = '04:30 PM',
    T1645 = '04:45 PM',
    T1700 = '05:00 PM',
    T1715 = '05:15 PM',
    T1730 = '05:30 PM',
    T1745 = '05:45 PM',
    T1800 = '06:00 PM',
    T1815 = '06:15 PM',
    T1830 = '06:30 PM',
    T1845 = '06:45 PM',
    T1900 = '07:00 PM',
    T1915 = '07:15 PM',
    T1930 = '07:30 PM',
    T1945 = '07:45 PM',
    T2000 = '08:00 PM',
    T2015 = '08:15 PM',
    T2030 = '08:30 PM',
    T2045 = '08:45 PM',
    T2100 = '09:00 PM',
    T2115 = '09:15 PM',
    T2130 = '09:30 PM',
    T2145 = '09:45 PM',
    T2200 = '10:00 PM',
    T2215 = '10:15 PM',
    T2230 = '10:30 PM',
    T2245 = '10:45 PM',
    T2300 = '11:00 PM',
    T2315 = '11:15 PM',
    T2330 = '11:30 PM',
    T2345 = '11:45 PM',
    T0000 = '12:00 AM',
    T0015 = '12:15 AM',
    T0030 = '12:30 AM',
    T0045 = '12:45 AM',
    T0100 = '01:00 AM',
    T0115 = '01:15 AM',
    T0130 = '01:30 AM',
    T0145 = '01:45 AM',
    T0200 = '02:00 AM',
    T0215 = '02:15 AM',
    T0230 = '02:30 AM',
    T0245 = '02:45 AM',
    T0300 = '03:00 AM',
    T0315 = '03:15 AM',
    T0330 = '03:30 AM',
    T0345 = '03:45 AM',
    T0400 = '04:00 AM',
    T0415 = '04:15 AM',
    T0430 = '04:30 AM',
    T0445 = '04:45 AM',
    T0500 = '05:00 AM',
    T0515 = '05:15 AM',
    T0530 = '05:30 AM',
    T0545 = '05:45 AM',
    T0600 = '06:00 AM',
    T0615 = '06:15 AM',
    T0630 = '06:30 AM',
    T0645 = '06:45 AM',
    T0700 = '07:00 AM',
    T0715 = '07:15 AM',
    T0730 = '07:30 AM',
    T0745 = '07:45 AM',
    T0800 = '08:00 AM',
    T0815 = '08:15 AM',
    T0830 = '08:30 AM',
    T0845 = '08:45 AM',
}

// TODO: There is for sure a better way to do this...
export const daysOfTheWeekMapNew = {
    1: 'LUN',
    2: 'MAR',
    3: 'MIÉ',
    4: 'JUE',
    5: 'VIE',
    6: 'SAB',
    0: 'DOM',
} as const;

// TO BE DELETED
export enum DaysOfTheWeek {
    MON = 'LUN',
    TUE = 'MAR',
    WED = 'MIÉ',
    THU = 'JUE',
    FRI = 'VIE',
    SAT = 'SAB',
    SUN = 'DOM',
}

// TODO: There is for sure a better way to do this...
export const daysOfTheWeekMap = {
    0: DaysOfTheWeek.SUN,
    1: DaysOfTheWeek.MON,
    2: DaysOfTheWeek.TUE,
    3: DaysOfTheWeek.WED,
    4: DaysOfTheWeek.THU,
    5: DaysOfTheWeek.FRI,
    6: DaysOfTheWeek.SAT,
};

export const dayNumberToDayKeyMap = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
};

export const defaultValues: Pick<
    Brand,
    'name' | 'handle' | 'imageUrl' | 'fontPalette' | 'colorPalette' | 'id'
> = {
    id: 'new',
    name: '',
    handle: '',
    imageUrl: '',
    fontPalette: {
        handWriting: 'sofia',
        primary: 'sofia',
        secondary: 'sofia',
    },
    colorPalette: {
        accent: '#000000',
        background: '#000000',
        font: '#000000',
        primary: '#000000',
    },
};

export const fontTypeMap = {
    primary: 'Primaria',
    secondary: 'Secundaria',
    handWriting: 'Manuscrita',
};

export const errors = {
    Signin: 'Error al iniciar sesión',
    OAuthSignin: 'Error al iniciar sesión',
    OAuthCallback: 'Error al iniciar sesión',
    OAuthCreateAccount: 'Error al iniciar sesión',
    EmailCreateAccount: 'Error al iniciar sesión',
    CallbackRouteError: 'Error al iniciar sesión',
    OAuthAccountNotLinked: 'Esta cuenta ya está siendo usada por otro usuario.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin: 'Error al iniciar sesión. Revisa tus credenciales.',
    'Invalid credentials Custom':
        'Error al iniciar sesión. Revisa tus credenciales.',
    default: 'Unable to sign in.',
};

export const aiModels = {
    writter: {
        dev: 'gpt-3.5-turbo',
        prod: 'gpt-4-0613',
    },
    ideas: {
        dev: 'gpt-3.5-turbo',
        prod: 'gpt-4-0613',
    },
    carousel: {
        dev: 'gpt-3.5-turbo',
        prod: 'gpt-4-0613',
    },
};

export const MAIN_MENU_ITEMS: TMenuItem[] = [
    {
        icon: Sparkles,
        label: 'Escribe con IA',
        href: '/app',
        shortLabel: 'Posts',
        status: 'active',
    },
    {
        icon: GalleryHorizontal,
        label: 'Crea un carrusel',
        href: '/app/carrousel/new',
        shortLabel: 'Carrusel',
        status: 'active',
    },
    {
        icon: Paperclip,
        label: 'Posts guardados',
        href: '/app/saved',
        shortLabel: 'Guardados',
        status: 'active',
    },
    {
        icon: Lightbulb,
        label: 'Ideas para post',
        href: '/app/ideas',
        shortLabel: 'Ideas',
        status: 'active',
    },
    {
        icon: CalendarCheck,
        label: 'Programa tus posts',
        href: '/app/schedule',
        shortLabel: 'Programar',
        status: 'active',
    },
    // {
    //     icon: BrainCog,
    //     label: 'Inspiración',
    //     href: '/app/inspo',
    //     shortLabel: 'Inspo',
    //     status: 'próximamente',
    // },
];

export const SECONDARY_MENU_ITEMS: TMenuItem[] = [
    {
        icon: Settings,
        label: 'Ajustes',
        href: '/app/settings',
        shortLabel: 'Ajustes',
        status: 'active',
    },

    // {
    //     icon: PanelTopCloseIcon,
    //     label: 'Pide herramientas',
    //     href: '/app/feature-request',
    //     shortLabel: 'Peticiones',
    //     status: 'active',
    // },
];
