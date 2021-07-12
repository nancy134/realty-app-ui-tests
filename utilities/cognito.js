const AWS = require('aws-sdk');

function getCognitoIdentityServiceProvider() {
    var params = {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    };
    return new AWS.CognitoIdentityServiceProvider(params);
}

exports.listUsers = function(params){
    var cognitoIdentifyServiceProvider = getCognitoIdentityServiceProvider();

    return cognitoIdentifyServiceProvider.listUsers(params).promise();
}

exports.adminGetUser = function(params){
    var cognitoIdentifyServiceProvider = getCognitoIdentityServiceProvider();

    return cognitoIdentifyServiceProvider.adminGetUser(params).promise();
}

exports.adminConfirmSignUp = function(params){
    var cognitoIdentifyServiceProvider = getCognitoIdentityServiceProvider();

    return cognitoIdentifyServiceProvider.adminConfirmSignUp(params).promise();
}

