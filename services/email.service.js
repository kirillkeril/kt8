import nodemailer from 'nodemailer';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    async sentActivationLink(to, link) {
        const fullLink = `${process.env.API_PATH}/users/activate/${link}`;

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Тестовая активация аккаунта",
            html: `<h1>Активация</h1>
                    <p>Для активации перейдите по ссылке:
                        <a href="${fullLink}">
                            ${fullLink}
                        </a>
                    </p>`

        }, (e) => {
            console.log(e);
        });
    }
}

export default new EmailService();