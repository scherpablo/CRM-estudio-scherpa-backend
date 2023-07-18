import nodemailer from 'nodemailer';

const emailHost = process.env.DEV_EMAIL_HOST || process.env.PROD_EMAIL_HOST;
const emailPort = process.env.DEV_EMAIL_PORT || process.env.PROD_EMAIL_PORT;
const emailUser = process.env.DEV_EMAIL_PORT || process.env.PROD_EMAIL_USER;
const emailPass = process.env.DEV_EMAIL_PASS || process.env.PROD_EMAIL_PASS;

const frontendUrl = process.env.DEV_FRONTEND_URL || process.env.PROD_FRONTEND_URL;

const emailForgotPassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });
    console.log(datos);
    const { email, name, lastName, token } = datos;

    const info = await transporter.sendMail({
        from: 'Estudio Scherpa',
        to: email,
        subject: 'Reestablece tu contraseña',
        text: 'Reestablecer Contraseña',
        html: `<p>Hola: ${email}, has solicitado reestablecer tu contraseña.</p>
        <p>Para reestablecer tu contraseña, haz clic en el siguiente enlace:
        <a href="${frontendUrl}/forgot-password/${token}">Reestablecer Contraseña</a></p>
        <p>Si tu no has solicitado este reestablecimiento, puedes ignorar este mensaje.</p>
        `
    });
    // Enviar el correo a tu dirección específica
    const infoAdmin = await transporter.sendMail({
        from: 'Estudio Scherpa', // Cambiar por tu dirección de correo
        to: emailUser, // Cambiar por tu dirección de correo específica
        subject: 'Solicitud de reestablecimiento de contraseña',
        text: `El usuario ${email} ha solicitado reestablecer su contraseña.`
    });
    console.log('Mensaje enviado: %s', info.messageId);
    console.log('Mensaje enviado: %s', infoAdmin.messageId);

};

export default emailForgotPassword;