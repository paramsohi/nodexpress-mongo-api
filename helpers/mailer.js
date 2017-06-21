let nodemailer = require('nodemailer');
let path = require('path');
let EmailTemplate = require('email-templates').EmailTemplate;
let templatesDir = path.resolve(__dirname, '../public/templates');

let smtpConfig = {
  service: 'gmail',
  auth: {
    user: '360itprotest@gmail.com',
    pass: '360itpRo2015@',
  },
};

let transporter = nodemailer.createTransport(smtpConfig);
const mailOptions = {
  from: '"Attnd " <360itprotest@gmail.com>', // sender address
  to: '',
  subject: '',
  text: '',
  html: '',
};

module.exports = {
  sendForgotMail: (to, options, cb) => {
    let template = new EmailTemplate(path.join(templatesDir, 'forgot-password'));
    const locals = {
      name: options.data.name,
      code: options.data.code,
    };
    template.render(locals, function (err, results) {
      if (err) {
        return console.error(err);
      }
      mailOptions.to = to;
      mailOptions.subject = options.subject;
      mailOptions.text = results.text;
      mailOptions.html = results.html;

      transporter.sendMail(mailOptions, (err, responseStatus) => {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          console.log(responseStatus.message);
          cb(null, responseStatus.message);
        }
      });
    });
  },

  sendRegisterMail: (to, options, cb) => {
    const template = new EmailTemplate(path.join(templatesDir, 'register'));
    const locals = {
      name: options.data.name,
    };
    template.render(locals, function (err, results) {
      if (err) {
        return cb(err);
      }
      mailOptions.to = to;
      mailOptions.subject = options.subject;
      mailOptions.text = results.text;
      mailOptions.html = results.html;

      transporter.sendMail(mailOptions, (err, responseStatus) => {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          console.log(responseStatus.message);
          cb(null, responseStatus.message);
        }
      });
    });
  },

  sendResolveIssueMail: (to, options, cb) => {
    const template = new EmailTemplate(path.join(templatesDir, 'resolve-issue'));
    const locals = {
      name: options.data.name,
      message: options.data.message,
    };
    template.render(locals, function (err, results) {
      if (err) {
        return cb(err);
      }
      mailOptions.to = to;
      mailOptions.subject = options.subject;
      mailOptions.text = results.text;
      mailOptions.html = results.html;

      transporter.sendMail(mailOptions, (err, responseStatus) => {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          console.log(responseStatus.message);
          cb(null, responseStatus.message);
        }
      });
    });
  },

};

