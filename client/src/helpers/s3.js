import S3 from 'aws-sdk/clients/s3';

const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
const region = process.env.REACT_APP_AWS_BUCKET_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

export const uploadFile = async (file, name) => {
	return await s3.upload({
		Bucket: bucketName,
		Body: new Buffer.from(
			file.replace(/^data:image\/\w+;base64,/, ''),
			'base64'
		),
		Key: name,
	}).promise();
};
