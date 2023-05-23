const express = require('express');
const { searchGames,getLast30DaysReleases, getHotThisWeek, getNextWeekReleases,getReleasesByDate, searchGameById, getGameDeals } = require('../controllers/gameController');
const router = express.Router();

router.get('/search',searchGames);
router.get('/lastthirtydays',getLast30DaysReleases)
router.get('/hotthisweek',getHotThisWeek)
router.get('/nextweek',getNextWeekReleases);
router.get('/release-calendar', getReleasesByDate);
router.get("/prices", getGameDeals)
router.get("/:id", searchGameById)




module.exports = router;
