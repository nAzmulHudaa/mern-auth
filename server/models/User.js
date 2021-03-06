const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please provide a username'],
    },
    email:{
        type: String,
        required: [true,'Please provide an email'],
        unique: true,
        match:[
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please Provide a valid email"
        ]
    },
    password:{
        type: String,
        required: [true,'Please add a password'],
        minlength: [8,'Password must be at least 8 characters long'],
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User',UserSchema);

module.exports =  User;