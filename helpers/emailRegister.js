import nodemailer from 'nodemailer';

const emailHost = process.env.DEV_FRONTEND_URL || process.env.PROD_EMAIL_HOST;
const emailPort = process.env.DEV_EMAIL_PORT || process.env.PROD_EMAIL_PORT;
const emailUser = process.env.DEV_EMAIL_USER || process.env.PROD_EMAIL_USER;
const emailPass = process.env.DEV_EMAIL_PASS || process.env.PROD_EMAIL_PASS;

const frontendUrl = process.env.DEV_FRONTEND_URL || process.env.PROD_FRONTEND_URL;

const emailRegister = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });
    
    const { email, name, lastName, token } = datos;

    const info = await transporter.sendMail({
        from: 'Estudio Scherpa',
        to: email,
        subject: 'Comprueba tu cuenta en Estudio Scherpa',
        text: 'Comprueba tu cuenta en Estudio Scherpa',
        html: `<p>Hola: ${name} ${lastName}, te has registrado correctamente como administrador de Estudio Scherpa.</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${frontendUrl}/confirm-account/${token}">Comprobar Cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    });
    // Enviar el correo a tu dirección específica
    const infoAdmin = await transporter.sendMail({
        from: 'Estudio Scherpa', // Cambiar por tu dirección de correo
        to: emailUser, // Cambiar por tu dirección de correo específica
        subject: 'Nuevo registro de usuario',
        text: `Se ha registrado un nuevo usuario en el sitio. Nombre: ${name}, Apellido: ${lastName}, Correo: ${email}.`
    });
    console.log('Mensaje enviado: %s', info.messageId);
    console.log('Mensaje enviado: %s', infoAdmin.messageId);
};

export default emailRegister;



