import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b394d4eef40b47",
      pass: "af3863cd5f704b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Ytalo Lopes <lopessoftec@gmail.com>',
            subject,
            html: body,
        })
    };
}