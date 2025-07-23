const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post("/register", UserController.register);
router.post("/follow/:id", auth, UserController.follow);
router.get("/followers", auth, UserController.getFollowers);
router.get("/stats", auth, UserController.getUserStats);
router.get("/search/:id", UserController.searchUsers);
router.get("/tweets/:id", UserController.getTweetsForUser);

module.exports = router;