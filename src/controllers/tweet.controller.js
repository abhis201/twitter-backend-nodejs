const Tweets = require("../models/Tweet");
const User = require("../models/User");
const app = require("express")();

const tweet = async(req, res) => {
    const _id = req.user || process.env.USER || req.header('user');
    console.log("Creating tweet for user:", _id)
    try {
        const newtweet = new Tweets({"Tweet":req.body.Tweet});
        const added = await newtweet.save();

        const addinuser = await User.followmodel.findOne({"User":_id});
        if (!addinuser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        addinuser.Tweets = addinuser.Tweets || []
        addinuser.Tweets.push(added._id)
        await addinuser.save()
        
        res.json({
            success: true,
            message: "Tweet posted successfully",
            tweet: added
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTweet = async(req, res) => {
    const tweetid = req.params.id;
    const _id = req.user || process.env.USER || req.header('user');
    
    try{
        // Delete tweet from tweets collection
        const deletedTweet = await Tweets.findByIdAndDelete(tweetid);
        if (!deletedTweet) {
            return res.status(404).json({
                success: false,
                message: "Tweet not found"
            });
        }
        
        // Remove tweet from user's tweets
        const remTweetUser = await User.followmodel.findOne({"User": _id});
        if (remTweetUser) {
            remTweetUser.Tweets.pull(tweetid);
            await remTweetUser.save();
        }
        
        res.json({
            success: true,
            message: "Tweet deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const likeTweet = async(req, res) => {
    const tweetid = req.params.id;
    try {
        const liketweet = await Tweets.findOne({"_id":tweetid});
        if (!liketweet) {
            return res.status(404).json({
                success: false,
                message: "Tweet not found"
            });
        }
        
        liketweet.Likes++;
        await liketweet.save();
        
        res.json({
            success: true,
            message: "Tweet liked successfully",
            tweet: liketweet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllTweets = async(req, res) => {
    try {
        const tweets = await Tweets.find().sort({ _id: -1 }).limit(50);
        res.json({
            success: true,
            tweets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const TweetController = {
    tweet,
    deleteTweet,
    likeTweet,
    getAllTweets
};

module.exports = TweetController;