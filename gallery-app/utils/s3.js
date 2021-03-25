require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// function that uploads file to s3
function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.originalname
    };
    return s3.upload(uploadParams).promise();
}

// function downloads file from s3
function getFileStream(fileKey){
    const downloadedParams = {
        Bucket: bucketName,
        Key: fileKey
    };
    return s3.getObject(downloadedParams).createReadStream();
    // return s3.getObject(downloadedParams);
}

// function to delete an image from s3 bucket
function deleteImage(fileKey){
    const params = {
        Bucket: bucketName,
        Key: fileKey
    };
    return s3.deleteObject(params);
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.deleteImage = deleteImage;