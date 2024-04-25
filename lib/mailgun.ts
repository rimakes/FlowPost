import { appConfig } from '@/config/shipper.appconfig';
import Mailgun from 'mailgun.js';

const formData = require('form-data');

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    url: 'https://api.mailgun.net',
    key: process.env.MAILGUN_API_KEY!,
});

/**
 * Sends an email using the provided parameters.
 */
export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string,
    replyTo: string
) => {
    const data = {
        from: appConfig.email.fromAdmin,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo && { 'h:Reply-To': replyTo }),
    };

    try {
        await mg.messages.create(
            appConfig.email.testSubdomain,
            // (config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") +
            // config.domainName,
            data
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
