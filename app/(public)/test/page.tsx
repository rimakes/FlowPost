'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Feedback from '@/components/shared/feedback';
import { AvatarGroup } from '@/components/shared/AvatarGroup';
import { Faq } from '@/components/marketing/faq';
import { Pricing } from '@/components/marketing/pricing';
import { LogoGrid } from '@/components/marketing/logo-grid';
import { Features } from '@/components/marketing/features';
import Laurels from '@/components/marketing/laurels';
import { Newsletter } from '@/components/marketing/newsletter';
import CtaWithSocial from '@/components/marketing/cta-with-social';
import { LoginButton } from '@/components/auth/LoginButton';
import { SlidingElements } from '@/components/marketing/sliding-elements';
import { Explanation } from '@/components/shared/explanation';
import { handwritten, secondaryFont } from '@/config/fonts';
import { Dropzone } from '@/components/shared/dropzone/Dropzone';
import { useState } from 'react';
import {
    TExtendedFile,
    Thumbnails,
} from '@/components/shared/dropzone/Thumbnails';

export default function Home() {
    // const session = await auth();
    const [files, setFiles] = useState<TExtendedFile[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(() => {
            console.log('dropped');
            return acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
        });
    };

    return (
        <div className={`gap flex flex-col items-center justify-between`}>
            <Dropzone onDrop={onDrop} maxFiles={2} className='h-48 w-48' />
            <Thumbnails files={files} classNamesThumbnails='h-24 w-24' />
            {/* <h1
                className={`text-6xl font-extrabold font-grotesqu relative ${secondaryFont.className}`}
            >
                This is just a test
                <span
                    className={`${handwritten.className} font-thin text-lg absolute -top-6 right-0 text-slate-600`}
                >
                    This is a comment!
                </span>
            </h1>
            <div className=''>
                <h2
                    className={`text-center text-2xl font-bold ${secondaryFont.className} mb-8`}
                >
                    Colors
                </h2>
                <div className='flex gap-2 text-xs'>
                    <div className='p-3 h-10 bg-primary rounded-md text-primary-foreground flex items-center justify-center'>
                        Primary
                    </div>
                    <div className='p-3 h-10 bg-secondary rounded-md text-secondary-foreground flex items-center justify-center'>
                        Secondary
                    </div>
                    <div className='p-3 h-10 bg-muted rounded-md text-muted-foreground flex items-center justify-center'>
                        Muted
                    </div>
                    <div className='p-3 h-10 bg-accent rounded-md text-accent-foreground flex items-center justify-center'>
                        accent
                    </div>
                    <div className='p-3 h-10 bg-destructive rounded-md text-destructive-foreground flex items-center justify-center'>
                        destructive
                    </div>
                    <div className='p-3 h-10 bg-popover rounded-md text-popover-foreground flex items-center justify-center'>
                        popover
                    </div>
                    <div className='p-3 h-10 bg-background rounded-md text-foreground flex items-center justify-center'>
                        bg-fore
                    </div>
                    <div className='p-3 h-10 bg-border rounded-md text-black flex items-center justify-center'>
                        border
                    </div>
                    <div className='p-3 h-10 bg-ring rounded-md text-white flex items-center justify-center'>
                        ring
                    </div>
                </div>
            </div>
            <div>
                Here I am just highlighting some text to see{' '}
                <mark
                    className='px-[0.4em] py-[0.1em] -mx-[0.4em] rounded-[0.8em_0.3em] bg-transparent bg-[linear-gradient(to_right,_rgb(0_255_171_/_10%),_rgb(0_255_46_/_70%)_4%,_rgb(0_255_125_/_30%)_)] box-decoration-clone
                [-webkit-box-decoration-break:clone]'
                >
                    how it looks with the highlight color applied
                </mark>
                to it. This is just a test to see how it looks.
            </div>
            <SlidingElements />

            <Button>Button</Button>
            <LoginButton mode='modal'>
                <Button>Entrar</Button>
            </LoginButton>
            <ModeToggle />
            <Avatar>
                <AvatarImage src='/images/placeholders/avatars/avatar-01.jpg' />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <AvatarGroup />
            <Faq />
            <Feedback />
            <LogoGrid />
            <Pricing />
            <Features />
            <Laurels />
            <Newsletter />
            <CtaWithSocial
                accentText={'30% de descuento'}
                buttonLabel={'Comprar'}
                primaryText={'a las primeras 200 compras'}
            />

            <p>
                Un texto con aclaración
                <Explanation message='This is a quite awesome explanation' />{' '}
            </p> */}
        </div>
    );
}
