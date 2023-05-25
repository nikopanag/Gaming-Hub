const axios = require("axios");
require("dotenv").config();
const User = require("../models/userModel");

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

    const currentDate = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}-${String(currentDay).padStart(2, "0")}`;
    console.log(currentDate);
    const nextWeekDate = `${nextWeekYear}-${String(nextWeekMonth).padStart(
      2,
      "0"
    )}-${String(nextWeekDay).padStart(2, "0")}`;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${currentDate},${nextWeekDate}`
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getReleasesByMonth = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1)
      .toISOString()
      .split("T")[0];
    const endOfMonth = new Date(year, month, 0).toISOString().split("T")[0];

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${startOfMonth},${endOfMonth}`
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.searchGameById = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.RAWG_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getGenreBasedRecommendations = async (req, res, next) => {
  console.log("function running");
  try {
    const { _id } = req.user;
    console.log('User:', req.user)

    const user = await User.findById(_id);
    const genres = user.preferences.map((genre) => genre);
    console.log('Genres:', genres)

    let recommendations = [];
    for(let i = 0; i < genres.length; i++) {
      const url = `https://api.rawg.io/api/games?genres=${genres[i]}&key=${process.env.RAWG_API_KEY}&page_size=5`;
      console.log('URL:', url);
      const response = await axios.get(url);
      recommendations = [...recommendations, ...response.data.results];
    }

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    next(error);
  }
};



