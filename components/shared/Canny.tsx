'use client';

import { appConfig } from '@/config/shipper.appconfig';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Script from 'next/script';

type CannyProps = {
    children?: React.ReactNode;
    className?: string;
};
export function CannyLink({
    children = <p>Suggerencias</p>,
    className,
}: CannyProps) {
    return (
        <>
            <Link
                href={`https://${appConfig.general.appName}.canny.io/peticiones`}
                target='_blank'
                data-canny-link
                className={cn(`block p-0`, className)}
            >
                {children}
            </Link>

            {/* REVIEW: Why this is not working??? */}
            {/* <Script
                strategy='afterInteractive'
                id='canny-sdk'
                // REVIEW: THIS IS NOT WORKING 👇
                onLoad={() => {
                    console.log('Canny loaded');
                    // @ts-ignore
                    Canny('identify', {
                        appID: '661bb0bd39e8bde4a10c9d10',
                        user: {
                            // Replace these values with the current user's data
                            email: 'ricardo@grouz.io',
                            name: 'Ricardo',
                            id: 'testId',

                            // These fields are optional, but recommended:
                            // avatarURL: user.avatarURL,
                            // created: new Date(user.created).toISOString(),
                        },
                    });
                }}
                onError={(error) => {
                    console.error('Canny failed to load', error);
                }}
            >
                {/* <!-- Download Canny SDK --> */}

            <Script id='canny-sdk' strategy='afterInteractive'>
                {`!function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}}(window,document,"canny-jssdk","script");`}
            </Script>
            <Script id='canny-identify' strategy='lazyOnload'>
                {`Canny('identify', {
                        appID: '661bb0bd39e8bde4a10c9d10',
                        user: {
                            // Replace these values with the current user's data
                            email: 'ricardo@grouz.io',
                            name: 'Ricardo',
                            id: 'testId',

                            // These fields are optional, but recommended:
                            // avatarURL: user.avatarURL,
                            // created: new Date(user.created).toISOString(),
                        },
                    });`}
            </Script>
        </>
    );
}
