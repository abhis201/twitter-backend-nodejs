const User = require("../models/User");


const register = async(req, res) => {
    try{
    const newUser = new User.usermodel({'id':req.body.id,'email':req.body.email,'password':req.body.password});
    const reguser = await newUser.save();
    const newFollow = new User.followmodel({'User':reguser._id});
    await newFollow.save();
    console.log("User Registered Successfully");
    res.send(reguser);
    }
    catch(err){
        res.status(401).send(err.message);
    }
};

const follow = async(req, res) => {
    const curuser = req.user || process.env.USER || req.header('user');
    const followuser = req.params.id;
    
    console.log("Current user:", curuser);
    console.log("Following user:", followuser);

    try{
        // Check if users exist
        const targetUser = await User.usermodel.findById(followuser);
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User to follow not found"
            });
        }

        //To increase the other users followers
        const otherUser = await User.followmodel.findOne({"User":followuser});
        if (!otherUser) {
            return res.status(404).json({
                success: false,
                message: "Follow record for target user not found"
            });
        }
        
        otherUser.Followers = otherUser.Followers || [];
        
        // Check if already following
        if (otherUser.Followers.includes(curuser)) {
            return res.status(400).json({
                success: false,
                message: "You are already following this user"
            });
        }
        
        otherUser.Followers.push(curuser);
        await otherUser.save();

        //To increase the users following
        const getUserDetail = await User.followmodel.findOne({"User":curuser});
        if (!getUserDetail) {
            return res.status(404).json({
                success: false,
                message: "Your follow record not found"
            });
        }
        
        getUserDetail.Following = getUserDetail.Following || [];
        getUserDetail.Following.push(followuser);
        const added = await getUserDetail.save();
        
        res.json({
            success: true,
            message: "Successfully followed user",
            following: added.Following.length,
            followers: otherUser.Followers.length
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getFollowers = async(req, res) => {
    const _id = req.user || process.env.USER || req.header('user');
    try{
        const getFollowers = await User.followmodel.findOne({"User": _id}).populate('Followers', 'id email');
        if (!getFollowers) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            followers: getFollowers.Followers,
            count: getFollowers.Followers.length
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getUserStats = async(req, res) => {
    const _id = req.user || process.env.USER || req.header('user');
    try {
        const followStats = await User.followmodel.findOne({'User':_id})
            .populate('User', 'id email')
            .populate('Followers', 'id')
            .populate('Following', 'id')
            .populate('Tweets');
        
        if (!followStats) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            stats: {
                user: followStats.User,
                followersCount: followStats.Followers.length,
                followingCount: followStats.Following.length,
                tweetsCount: followStats.Tweets.length,
                followers: followStats.Followers,
                following: followStats.Following,
                tweets: followStats.Tweets
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchUsers = async(req, res) => {
    try {
        const search = await User.followmodel.findOne({"User":req.params.id}).populate('User', 'id email');
        if (!search) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            user: search
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTweetsForUser = async(req, res) => {
    const _id = req.params.id;
    try {
        const userTweets = await User.followmodel.findOne({"User": _id}).populate('Tweets');
        if (!userTweets) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            tweets: userTweets.Tweets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const UserController = {
    register,
    follow,
    getFollowers,
    getUserStats,
    searchUsers,
    getTweetsForUser
};

module.exports = UserController;