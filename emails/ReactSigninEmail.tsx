import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { appConfig } from '@/config/shipper.appconfig';

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
    const previewText = `Entra en ${appConfig.general.appName}`;

    return (
        <Html className='text-primary'>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='mx-auto my-auto bg-white px-2 font-sans'>
                    <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]'>
                        <Section className='mt-[32px]'>
                            <Img
                                src={`https://flowpost.io/images/logo.png`}
                                alt='Vercel'
                                className='mx-auto my-0 w-32'
                            />
                        </Section>
                        <Heading className='mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black'>
                            Crea carrusels y post de Linkedin en segundos
                        </Heading>
                        <Text className='text-[14px] leading-[24px] text-black'>
                            Hola! 👋
                        </Text>
                        <h1 className='text-center text-xl text-indigo-500'>{`ENTRA EN ${appConfig.general.appName.toUpperCase()}`}</h1>
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
                        <Section className='mb-[32px] mt-[32px] text-center'>
                            <Button
                                className='rounded bg-indigo-500 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline'
                                href={url}
                            >
                                Entrar
                            </Button>
                        </Section>
                        <Text className='text-[14px] leading-[24px] text-black'>
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
