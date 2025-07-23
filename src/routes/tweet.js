const express = require("express");
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const auth = require('../middleware/auth');

router.get("/", TweetController.getAllTweets);
router.post("/", auth, TweetController.tweet);
router.delete("/:id", auth, TweetController.deleteTweet);
router.put("/like/:id", TweetController.likeTweet);

module.exports = router;