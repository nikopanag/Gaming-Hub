const express = require('express');
const { addGameToLibrary, removeGameFromLibrary, getUserLibrary, updateGameInLibrary } = require('../controllers/libraryController');
const { auth } = require('../middleware/authentication');
const router = express.Router();

router.route("/").post(auth,addGameToLibrary).delete(auth,removeGameFromLibrary).get(auth,getUserLibrary).put(auth,updateGameInLibrary);

module.exports = router;