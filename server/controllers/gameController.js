const axios = require("axios");
require("dotenv").config();

exports.searchGames = async (req, res, next) => {
  const { title } = req.query;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`
    );
    const games = response.data;
    res.status(200).json({
      status: "success",
      results: games.length,
      data: games,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLast30DaysReleases = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    date.setDate(currentDay - 30);
    const lastMonthDay = date.getDate();
    const lastMonth = date.getMonth() + 1;
    const lastYear = date.getFullYear();

    const currentDate = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}-${String(currentDay).padStart(2, "0")}`;
    const lastMonthDate = `${lastYear}-${String(lastMonth).padStart(
      2,
      "0"
    )}-${String(lastMonthDay).padStart(2, "0")}`;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${lastMonthDate},${currentDate}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getHotThisWeek = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    date.setDate(currentDay - 7);
    const lastWeekDay = date.getDate();
    const lastWeekMonth = date.getMonth() + 1;
    const lastWeekYear = date.getFullYear();

    const currentDate = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}-${String(currentDay).padStart(2, "0")}`;
    const lastWeekDate = `${lastWeekYear}-${String(lastWeekMonth).padStart(
      2,
      "0"
    )}-${String(lastWeekDay).padStart(2, "0")}`;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${lastWeekDate},${currentDate}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getNextWeekReleases = async (req, res, next) => {
  try {
    const date = new Date();
    const nextWeekDay = date.getDate() + 7; // Add 7 days to get the date a week later
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    date.setDate(nextWeekDay);
    const nextWeekMonth = date.getMonth() + 1;
    const nextWeekYear = date.getFullYear();

    const currentDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
    console.log(currentDate)
    const nextWeekDate = `${nextWeekYear}-${String(nextWeekMonth).padStart(2, '0')}-${String(nextWeekDay).padStart(2, '0')}`;

    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${currentDate},${nextWeekDate}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getReleasesByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    console.log(date)
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${date},${date}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.searchGameById = async (req, res, next) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.RAWG_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    next(error)
  }
}

exports.getGameDeals = async (req, res, next) => {
  /* console.log('getGameDeals called'); */
  try {
    const gameTitle = req.query.gameTitle;
    console.log(gameTitle);

    const response = await axios.get(`https://api.isthereanydeal.com/v01/game/prices/?key=${process.env.ISTHEREANYDEAL_API_KEY}&plains=${gameTitle}`);
    console.log(response.data.data);

    const deals = response.data.data[gameTitle].list;
    
    res.json(deals);
  } catch (error) {
    next(error);
  }
};

