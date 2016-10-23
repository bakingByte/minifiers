'use strict';

module.exports = function(Email) {
    Email.sendEmail = function (mailInfo, cb) {
        Email.app.models.email.send({
            to: "harsh.sapra92@gmail.com",
            from: 'masti13harsh@gmail.com',
            subject: 'Your custom email subject here',
            html: "Hiii"
        }, function (err, mail) {
            console.log('email sent!');
            console.log(mail);
            console.log(err);
            if (err) return err;
        });

        cb(null, 'Greetings...' + msg);
    }

    Email.remoteMethod(
        'sendEmail', {
            http: {
                path: '/sendEmail',
                verb: 'get'
            },
            description: [
                "api to send email"
            ],
            accepts: {
                arg: 'mailInfo',
                type: 'object',
                required: 'true'
            },
            returns: {
                arg: 'greeting',
                type: 'string'
            }
        }
    );
};
