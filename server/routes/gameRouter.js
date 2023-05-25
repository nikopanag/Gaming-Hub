const express = require('express');
const { searchGames,getLast30DaysReleases, getHotThisWeek, getNextWeekReleases, searchGameById, getReleasesByMonth, getGenreBasedRecommendations } = require('../controllers/gameController');
const { auth } = require('../middleware/authentication');
const router = express.Router();

router.get('/search',searchGames);
router.get('/lastthirtydays',getLast30DaysReleases)
router.get('/hotthisweek',getHotThisWeek)
router.get('/nextweek',getNextWeekReleases);
router.get('/release-calendar', getReleasesByMonth);
router.get("/recommendations", auth,getGenreBasedRecommendations);
router.get("/:id", searchGameById)

module.exports = router;
