'use strict';
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "YOURKEY",
    secretAccessKey: "YOURSECRET",
    "region": "sa-east-1"
});


module.exports = function(Email) {
    Email.sendEmail = function (mailInfo, cb) {
        var sns = new AWS.SNS({ region: 'ap-southeast-1'});

        var snsMessage = 'New signup: %EMAIL%'; //Send SNS notification containing email from form.
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
