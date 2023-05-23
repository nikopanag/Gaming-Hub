const express = require('express');
const { auth } = require('../middleware/authentication');
const { addGameToWishlist, removeGameFromWishlist, getUserWishlist } = require('../controllers/wishlistController');
const router = express.Router();

router.route("/").post(auth,addGameToWishlist).delete(auth,removeGameFromWishlist).get(auth,getUserWishlist)

module.exports = router;