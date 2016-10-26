'use strict';
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "AKIAJGOKBVHVHSWTK2OA",
    secretAccessKey: "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",
    "region": "ap-southeast-1"
});


module.exports = function(Email) {
    Email.sendEmail = function (name, email, subject, message, cb) {
        var sns = new AWS.SNS({ region: 'ap-southeast-1'});

        var snsMessage = '<html><body><h2>Name: %NAME%</h2></body></html> \nEmail: %EMAIL% \nSubject: %SUBJECT% \nMessage: %MESSAGE%'; //Send SNS notification containing email from form.   
        snsMessage = snsMessage.replace('%NAME%', name);
        snsMessage = snsMessage.replace('%EMAIL%', email);
        snsMessage = snsMessage.replace('%SUBJECT%', subject);
        snsMessage = snsMessage.replace('%MESSAGE%', message);; //Send SNS notification containing email from form.
        sns.publish({ TopicArn: 'arn:aws:sns:ap-southeast-1:002732868379:ContactUs', Message: snsMessage }, function(err, data) {
            if (err) {
            console.log('Error publishing SNS message: ' + err);
            } else {
            console.log('SNS message sent.');
            }
        });

        cb(null, 'Greetings...');
    }

    Email.remoteMethod(
        'sendEmail', {
            http: {
                path: '/sendEmail',
                verb: 'post'
            },
            description: [
                "api to send email"
            ],
            accepts: [
                {
                    arg: 'name',
                    type: 'string',
                    required: 'true'
                },
                {
                    arg: 'email',
                    type: 'string',
                    required: 'true'
                },
                {
                    arg: 'subject',
                    type: 'string',
                    required: 'true'
                },
                {
                    arg: 'message',
                    type: 'string',
                    required: 'true'
                }
            ],
            returns: {
                arg: 'greeting',
                type: 'string'
            }
        }
    );
};
