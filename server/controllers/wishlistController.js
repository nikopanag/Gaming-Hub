const User = require("../models/userModel");

// Add a game to the user's wishlist
exports.addGameToWishlist = async (req, res, next) => {
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

    user.wishlist.push(newGame);
    await user.save();

    res.status(200).json({ message: "Game added to wishlist successfully" });
  } catch (error) {
    next(error);
  }
};

// Remove a game from the user's wishlist

exports.removeGameFromWishlist = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { gameId } = req.body;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const gameIndex = user.wishlist.findIndex((game) => game.gameId === gameId);
        if (gameIndex === -1) {
            return res.status(404).json({ error: "Game not found in wishlist" });
        }

        user.wishlist.splice(gameIndex, 1);
        await user.save();

        res.status(200).json({ message: "Game removed from wishlist successfully" });
    } catch (error) {
        next(error);
    }

}

// Get the user's wishlist
exports.getUserWishlist = async (req, res, next) => { 
    try {
        const { _id } = req.user;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const wishlist = user.wishlist;

        res.status(200).json({ wishlist });
    } catch (error) {
        next(error)
    }
}