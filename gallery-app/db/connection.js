const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/gallery-app';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});