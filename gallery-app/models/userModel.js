const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name:String,
   email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      trim: true,
      lowercase: true,
      validator: [validator.isEmail, 'Invalid email']
   },
   password: {
      type: String,
      required: [true, 'Password required'],
      trim: true,
      minlength: 7,
      validate(value) {
          if (value.toLowerCase().includes('password')) {
              throw new Error('Password must not contain "Password"');
          }
      }
   },
   userToken: {
      type: String,
      // required: [true, 'Token required']
  }
});

userSchema.pre('save', async function (next) {
   this.password = await bcrypt.hash(this.password, 8);
   next();
});

userSchema.methods.matchPassword = async function(password, encryptedPass){
   return await bcrypt.compare(password, encryptedPass);
};

const User = mongoose.model('user', userSchema);
module.exports = User;
