const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const tweets = require('./Tweet')

const UserSchema = mongoose.Schema({
    id:{type:String, required: true,unique:true},
    email:{type:String, required:true,unique:true, validate:[validator.isEmail,'Invalid Email']},
    password: {type: String, required: true},
})

const FollowSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'usermodel'},
    Followers:[{type:mongoose.Schema.Types.ObjectId,ref:'usermodel',unique:true}],
    Following:[{type:mongoose.Schema.Types.ObjectId,ref:'usermodel',unique:true}],
    Tweets:[{type:mongoose.Schema.Types.ObjectId,ref:tweets}]
})

UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next()
})

const usermodel = mongoose.model('Users',UserSchema);
const followmodel = mongoose.model('Follows',FollowSchema);

const User = {
    usermodel,
    followmodel
}

module.exports = User;