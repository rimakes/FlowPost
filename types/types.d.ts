import type { Position, Prisma, PrismaClient, TimeSlot } from '@prisma/client';
import { decorationMap } from '@/app/app/carrousel/_components/slideParts/SlideDecoration';
import { ASPECT_RATIOS_MAP } from '@/app/app/carrousel/_components/const';
import { fontsMap } from '@/config/fonts';
import { designNamesMap } from '@/app/app/carrousel/_components/slideContents/contentMaps';
import {
    DaysOfTheWeek,
    TIME_OF_THE_DAY,
    daysOfTheWeekMapNew,
} from '@/config/const';
import { FONTS } from '@/config/fontsBigList';

export type HttpStatusCode = 200 | 201 | 400 | 401 | 404 | 500; // Extend as needed

export type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
};

//   Utility type: Make a specific property nullable
export type MakeNullable<T, K extends keyof T> = Omit<T, K> & // First we ommit the whole property
    Partial<Pick<T, K>>; // Then we add it as a partial property

export type ChildrenProps = {
    children: React.ReactNode;
};

export type AuthContextProps = {
    isLoggedIn: Boolean;
    user: any; // TODO: temporal
};

export type Post = {
    slug: string;
    title: string;
    published: boolean;
    tags: string[];
    date: string;
};

export type TToggleableCarouselSettings =
    | 'showSwipeLabel'
    | 'showCounter'
    | 'showAuthor'
    | 'showDecoration'
    | 'showProfilePic'
    | 'showName'
    | 'showHandle'
    | 'showAuthorInFirstOnly'
    | 'alternateColors';

export type TToggleableSlideSettings =
    | 'title'
    | 'tagline'
    | 'slideHeading'
    | 'bigCharacter';

export type TArrayOfRefs = RefObject<HTMLDivElement>[];

export type ApiResponse<T = undefined, E = ApiError> =
    | {
          statusCode: HttpStatusCode;
          message: string;
          data: T | undefined;
          ok: true;
          meta?: any; // Additional metadata
          pagination?: PaginationInfo;
      }
    | {
          data: T;
          statusCode: HttpStatusCode;
          message: string;
          ok: false;
          error: E;
          meta?: any; // Additional metadata
      };

export type ApiRequestBody<
    T = undefined,
    A = 'CREATE' | 'UPDATE' | 'DELETE' | 'INVITE' | 'EXIT',
> = {
    data: T;
    action: A;
};

export type TStatus = 'idle' | 'loading' | 'success' | 'error';

export type TCarouselTemplate = {};

export type TSlideContent = {
    title: string;
    paragraph: string;
    tagline: string;
};

// #### START OF TRYING
// REVIEW: Not sure if this makes things easier or more complicated...will take it for a spin
// IMPORTANT: NOT USING IT, BUT MAY BE USEFUL IN THE FUTURE
type ModelNames = Prisma.ModelName; // Union Type with the names of all Models: "User" | "Post"...

// Prisma model is a Record...
export type PrismaModels = {
    // ...where each key is a ModelName...
    [M in ModelNames]: Exclude<
        // ...and each value is the awaited return type of the findUnique method of the PrismaClient of the corresponding model
        Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
        null //..excluding null
    >;
};
// Is the equivalent of doing something like this:
// const user = await prisma.user.findUnique({ where: { id: 1 } });
// typeof user
// #### END OF TRYING

// Helper type that converts a database model into an object to work with in the frontend (i.e. ommits id, createdAt, updatedAt, etc).
export type Pure<T> = Omit<T, 'createdAt' | 'updatedAt'>;

// REVIEW: What is the difference between "getPayload" and just getting the type from the PrismaClient?
export type TLinkedinPost = Pure<Prisma.LinkedinPostGetPayload<{}>>;
export type TScheduledPost = Pure<Prisma.ScheduledPostGetPayload<{}>>;
export type TCarousel = Pure<Prisma.CarouselGetPayload<{}>>;

type TAspectRatioMap = typeof ASPECT_RATIOS_MAP;

export type TFontNames = keyof typeof fontsMap;

export type TColorPalette = Prisma.ColorPaletteGetPayload<{}>;
export type TIdeas = Pure<Prisma.IdeaGetPayload<{}>>;

export type TSlide = Pure<Prisma.SlideGetPayload<{}>>;

export type TBrand = Pure<Prisma.BrandGetPayload<{}>>;

export type TFeedback = '' | 'yes' | 'no' | 'partially';

type TAspectRatioMap = typeof ASPECT_RATIOS_MAP;
export type TAspectRatioEnum = keyof TAspectRatioMap;
export type TAspectRatioLabel = TAspectRatioMap[TAspectRatioEnum];

export type TFontName = (typeof FONTS)[number];

export type TFontPallete = Prisma.FontPaletteGetPayload<{}>;

export type TDecorationId = keyof typeof decorationMap;
export type TColor = keyof TColorPalette;

export type TFont = keyof TFontPalette;

export type TFontPalette = Prisma.FontPaletteGetPayload<{}>;

export type TOrientation = 'horizontal' | 'vertical';

export type TMode = 'light' | 'dark';

export type TImage = {
    url: string;
    alt: string;
    opacity: number;
    position: string;
};

export type TSlideDesignNames = keyof typeof designNamesMap;

export type TPosition = Position;

// REVIEW: You can "populate" the type of a Prisma model by using the "include" property in the PrismaClient
export type UserWithSettings = Prisma.UserGetPayload<{
    include: { settings: true };
}>;

// REVIEW: This below is probably a better way than "TPure" to get the type of a Prisma model without the "id", "createdAt", "updatedAt" and other fields...
// if I want to get the "create" input of a user?
export type UserCreateInput = Prisma.UserCreateInput;

// TODO: not sure this is the best way to do this

export type TDaysOfTheWeek = keyof typeof DaysOfTheWeek;

export type TSlot = TimeSlot;

export type TNameTimeOfDay = keyof typeof TIME_OF_THE_DAY;

export type TimeMap = {
    [key: string]: DayOfTheWeekNumber[];
};

export type DayMap = {
    [key: number]: string[];
};

export type DayOfTheWeekNumber = keyof typeof daysOfTheWeekMapNew;
export type DayOfTheWeek = (typeof daysOfTheWeekMapNew)[DayOfTheWeekNumber];

export type PostOrSlot = {
    hasPost: boolean;
    postId?: string;
    postContent?: string;
    isPublished?: boolean;
    time: string;
};

export type AppNotificacion = {
    lastShown: Date;
    dimissals: number;
    done: boolean;
    lastInteraction: Date | undefined;
    type: AppNotificationType;
    message?: string;
};

export type AppNotifications = {
    profileSetup?: AppNotificacion;
};

export type AppNotificationName = keyof AppNotifications;
export type AppNotificationType = 'info' | 'warning' | 'error' | 'success';

export type ImageWithDataUrl = {
    url: string;
    dataUrl: string;
};

export type TPageProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export type VoiceTone = {
    emoji: string;
    name: string;
    value: string;
    id: number;
};

export type TMenuItem = {
    icon: LucideIcon;
    label: string;
    shortLabel?: string;
    href: string;
    regex?: RegExp;
    status: 'active' | 'próximamente' | 'nuevo';
    className?: string;
    collapsed?: boolean;
    collapse?: () => void;
    as?: React.ElementType;
};
