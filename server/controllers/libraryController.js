const User = require("../models/userModel");

// Add a game to the user's library
exports.addGameToLibrary = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { gameId, title, image } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newGame = {
      gameId,
      title,
      image,
    };

    user.library.push(newGame);
    await user.save();

    res.status(200).json({ message: "Game added to library successfully" });
  } catch (error) {
    next(error);
  }
};

// Remove a game from the user's library
exports.removeGameFromLibrary = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { gameId } = req.body;
  
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const gameIndex = user.library.findIndex((game) => game.gameId === gameId);
      if (gameIndex === -1) {
        return res.status(404).json({ error: "Game not found in library" });
      }
  
      user.library.splice(gameIndex, 1);
      await user.save();
  
      res.status(200).json({ message: "Game removed from library successfully" });
    } catch (error) {
      next(error);
    }
  };
  

// Get the user's library
exports.getUserLibrary = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const library = user.library;

    res.status(200).json({ library });
  } catch (error) {
    next(error);
  }
};

// Update a game in the user's library
exports.updateGameInLibrary = async (req, res,next) => {
  try {
    const { _id } = req.user;
    const { gameId, title, image, platforms } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const gameIndex = user.library.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (gameIndex === -1) {
      return res.status(404).json({ error: "Game not found in library" });
    }

    user.library[gameIndex].title = title || user.library[gameIndex].title;
    user.library[gameIndex].image = image || user.library[gameIndex].image;
    user.library[gameIndex].platforms =
      platforms || user.library[gameIndex].platforms;

    await user.save();

    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    next(error);
  }
}
