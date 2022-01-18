require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

const uploadFile = async (file) => {
  return await s3.upload({
  	Bucket: bucketName,
  	Body: new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
  	Key: uuidv4()+'.jpg'
  });
}

module.exports = {
	uploadFile
};