const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const gallerySchema = new mongoose.Schema({
   key:{
       type: String,
       required: [true, 'Key is required']
   },
   userID:{
       type: ObjectID,
    //    required: [true, 'User Id required']
   },
   favourite: {
       type: Boolean,
       default: false
   },
   directory: {
       type: String,
       default: 'all'
   }
});

const Gallery = mongoose.model('gallery', gallerySchema);
module.exports = Gallery;
