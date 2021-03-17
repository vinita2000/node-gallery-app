const fs = require('fs');
const util = require('util');
const {uploadFile, getFileStream, deleteImage} = require('../utils/s3');
const Gallery = require('../models/imagesModel');
const unlinkFile = util.promisify(fs.unlink);

exports.uploads = async (req, res) => {
    try {
        const file = req.file;
        // const des = req.body.description;
        const userID = req.params.userId;
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        const image = await Gallery.create({key: result.Key, userID});
        if (!image){
            throw new Error('Failed to Upload');
        }
        res.status(200).json({
            message: 'Uploaded Successfully', 
            data: image
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

exports.getUserImages = async (req, res) => {
    try {
        const userID = req.params.userId;
        const images = await Gallery.find({userID});
        if (! images) {
            res.status(400).json({message: 'No images found'});
            return;
        }
        // find show all those images
        // for (const image of images){
        //     const readStream = getFileStream(image.key);
        //     readStream.pipe(res);
        // }
        // const readStream = getFileStream(image.key);
        // readStream.pipe(res);
        res.status(200).json({
            message: 'User Images',
            data: images
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

exports.deleteUserImage = async (req, res) => {
    try {
        const userID = req.params.userId;
        const _id = req.body.imgId;
        userImage = await Gallery.findOne({userID, _id}); 
        if(!userImage){
            throw new Error('No images');
        }
        const key = userImage.key;
        // console.log(key);
        await Gallery.findOneAndDelete({userID, _id});
        // delete from s3 as well
        const output = await deleteImage(key);
        // console.log(output);
        res.status(200).json({
            message: 'Image deleted'
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

exports.setImageDirectory = async (req, res) => {
    try{
        const userID = req.params.userId;
        const _id = req.body.imgId;
        const directory = req.body.directory;
        const image = await Gallery.findOneAndUpdate({userID, _id}, {directory}, {new: true});
        // const image = await Gallery.findOne({userID, _id});
        if(!image){
            throw new Error('No such image');
        }
        res.status(200).json({
            message: 'Directory updated',
            data: image
        });
        
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.getUserDirectories = async (req, res) => {
    try{
        const userID = req.params.userId;
        const images = await Gallery.find({userID});
        if(!images){
            throw new Error('No Directories');
        }
        let directories = [];
        for (const image of images){
            if (!directories.includes(image.directory)){
                directories.push(image.directory);
            }
        }
        res.status(200).json({
            message: 'List of directories',
            data: directories
        });
        
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.getDirectoryImages = async (req, res) => {
    try{
        const userID = req.params.userId;
        const directory = req.params.directoryName;
        const images = await Gallery.find({userID, directory});
        if(!images){
            throw new Error('No Images');
        }
        res.status(200).json({
            message: 'Directory Images',
            data: images
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};