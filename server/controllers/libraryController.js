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

    const gameExists = user.userCollection.find(
      (game) => game.gameId === gameId
    );

    if (gameExists) {
      return res.status(400).json({ error: "Game already in library" });
    }

    const newGame = {
      gameId,
      title,
      image,
    };

    user.userCollection.push(newGame);
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

    const gameIndex = user.userCollection.findIndex(
      (game) => game.gameId === gameId
    );
    if (gameIndex === -1) {
      return res.status(404).json({ error: "Game not found in library" });
    }

    user.userCollection.splice(gameIndex, 1);
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

    const library = user.userCollection;

    res.status(200).json({ library });
  } catch (error) {
    next(error);
  }
};

// Update a game in the user's library
exports.updateGameInLibrary = async (req, res, next) => {
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

    user.userCollection[gameIndex].title =
      title || user.userCollection[gameIndex].title;
    user.userCollection[gameIndex].image =
      image || user.userCollection[gameIndex].image;
    user.userCollection[gameIndex].platforms =
      platforms || user.userCollection[gameIndex].platforms;

    await user.save();

    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    next(error);
  }
};
