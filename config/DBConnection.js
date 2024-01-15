const mongoose = require("mongoose");
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

// Create a new Secrets Manager client
const secretsManager = new AWS.SecretsManager();

const connectionSecretKey = process.env.MONGODB_CONNECTION_STRING;

const secretName = 'MONGODB_CONNECTION_SECRET'

const connectDB = async () => {
  try {
    // Call AWS Secrets Manager to retrieve the secret value
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    // console.log(data)
    if('SecretString' in data){
      const connectionString = JSON.parse(data.SecretString)[connectionSecretKey];
      // console.log(connectionString);
      const connect = await mongoose.connect(connectionString);
    console.log(
      "connected to DB",
      connect.connection.host,
      connect.connection.name
    );

    }
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
