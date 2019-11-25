import AWS from 'aws-sdk'

AWS.config.region = process.env.VUE_APP_AWS_REGION

// Cognito Identity pool details
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID
});

// DynamoDB client
export const docClient = new AWS.DynamoDB.DocumentClient();