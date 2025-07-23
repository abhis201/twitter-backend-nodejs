const mongoose = require('mongoose');
// const User = require('../models/User')

const TweetSchema = mongoose.Schema({
    Tweet:{type:String,required:true,unique:true},
    Likes:{type:Number, default:0}
})

const tweetmodel = mongoose.model("Tweets",TweetSchema)

module.exports = tweetmodel