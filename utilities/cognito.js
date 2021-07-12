const AWS = require('aws-sdk');

function getCognitoIdentityServiceProvider() {
    var params = {
        accessKeyId : "AKIAWW2F2QXXUDQU6O5N" /*process.env.AWS_ACCESS_KEY_ID*/,
        secretAccessKey: "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"/*process.env.AWS_SECRET_ACCESS_KEY*/,
        region: "us-east-1"/*process.env.AWS_REGION*/
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

exports.getUsers = function(){
    console.log("getUsers()");
    return new Promise(function(resolve, reject){
        var params = {
            UserPoolId: "us-east-1_kTtaNstIX"
        };
        module.exports.listUsers(params).then(function(result){
            console.log(result);
            resolve(result);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}
