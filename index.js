'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('config.json'));

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'mail.pieterrees.nl',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.user,
        pass: config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <pieter@pieterrees.nl>', // sender address
    to: 'pieter@pieterrees.nl', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
