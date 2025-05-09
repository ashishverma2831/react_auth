const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email,
        pass: process.env.Email_Service_Password,
    },
});

const sendEmail = async (to, subject, text) => {
    let mailOptions = {
        from: process.env.Email,
        to: to,
        subject: subject,
        html: text,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info.response);
            }
        });
    });
}

module.exports = sendEmail;