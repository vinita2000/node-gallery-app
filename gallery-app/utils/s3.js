require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const bucketName = "gallery-vinita";
const region = "ap-south-1";
const accessKeyId = "AKIA5HUZFVGBFCA2FRW3";
const secretAccessKey = "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";

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