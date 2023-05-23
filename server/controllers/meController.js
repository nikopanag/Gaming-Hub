const { successHandler } = require('../middleware/successHandlers');
const User = require('../models/userModel');

exports.getMe = async (req, res) => {
  successHandler(res, 200, req.user.getPublicFields());
};

exports.updateMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    successHandler(res, 200, user.getPublicFields());
  } catch (error) {
    next(error);
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    successHandler(res, 200, { userDeleted: user.email });
  } catch (error) {
    next(error);
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    console.log("Request User:", req.user);
    if (!req.body.avatarURL) {
      throw new Error("Avatar URL is missing in the request.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: req.body.avatarURL },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user avatar.");
    }

    console.log("Updated user:", updatedUser);

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUserAvatar for user ID:", req.user._id, error);
    next(error);
  }
};

exports.updatePreferences = async (req, res) => {
  const { preferences } = req.body;

  try {
    // find the user and update preferences
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { preferences },
      { new: true } // option to return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
