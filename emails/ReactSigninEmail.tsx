import { appConfig } from '@/config/shipper.appconfig';
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { url } from 'inspector';
import { Theme } from 'next-auth';
import * as React from 'react';

interface VercelInviteUserEmailProps {
    email: string;
    url: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const ReactSigninEmail = ({
    email,
    url,
}: VercelInviteUserEmailProps) => {
    const previewText = `Join  on Vercel`;

    return (
        <Html className='text-primary'>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans px-2'>
                    <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
                        <Section className='mt-[32px]'>
                            <Img
                                src={`https://flowpost.io/images/logo.png`}
                                alt='Vercel'
                                className='my-0 mx-auto w-32'
                            />
                        </Section>
                        <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
                            Crea carrusels y post de Linkedin en segundos
                        </Heading>
                        <Text className='text-black text-[14px] leading-[24px]'>
                            Hola! 👋
                        </Text>
                        <h1 className='text-xl text-center text-indigo-500'>{`ENTRA EN ${appConfig.general.appName.toUpperCase()}`}</h1>
                        <Section>
                            {/* <Row>
                                <Column align='right'>
                                    <Img
                                        className='rounded-full'
                                        src={
                                            'https://flowpost.io/images/placeholders/user.png'
                                        }
                                        width='64'
                                        height='64'
                                    />
                                </Column>
                                <Column align='center'>
                                    <Img
                                        src={`https://flowpost.io/images/placeholders/user.png`}
                                        width='12'
                                        height='9'
                                        alt='invited you to'
                                    />
                                </Column>
                                <Column align='left'>
                                    <Img
                                        className='rounded-full'
                                        src={
                                            'https://flowpost.io/images/placeholders/user.png'
                                        }
                                        width='64'
                                        height='64'
                                    />
                                </Column>
                            </Row> */}
                        </Section>
                        <Section className='text-center mt-[32px] mb-[32px]'>
                            <Button
                                className='bg-indigo-500 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                                href={url}
                            >
                                Entrar
                            </Button>
                        </Section>
                        <Text className='text-black text-[14px] leading-[24px]'>
                            o copia y pega esta dirección en tu navegador:{' '}
                            <Link
                                href={url}
                                className='text-blue-600 no-underline'
                            >
                                {url}
                            </Link>
                        </Text>
                        {/* <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px] leading-[24px]'>
                            This invitation was intended for{' '}
                            <span className='text-black'>nombre</span>. This
                            invite was sent from{' '}
                            <span className='text-black'>io</span> located in{' '}
                            <span className='text-black'>ciudad</span>. If you
                            were not expecting this invitation, you can ignore
                            this email. If you are concerned about your account
                            safety, please reply to this email to get in touch
                            with us.
                        </Text> */}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
