const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const GameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  platforms: {
    type: [String],
    enum: ["playstation", "xbox", "steam", "gog"],
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    avatarURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    preferences: {
      type: [String],
      default: [],
    },
    library: {
      type: [GameSchema],
      default: [],
    },
    wishlist: {
      type: [GameSchema],
      default: [],
    },
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    id: false,
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);


// Execute this middleware before saving a user to the database.
UserSchema.pre("save", async function (next) {
  try {
    // Check if the password field has been modified before hashing it.
    if (!this.isModified("password")) {
      return next();
    }
    // Hash the password field with bcrypt.
    const hashed = await bcrypt.hash(this.password, 12);
    // Store the result in the password field.
    this.password = hashed;
    // Call the next middleware function.
    return next();
  } catch (err) {
    // If an error occurs pass it to the next middleware function.
    return next(err);
  }
});

// Compare the password with the hashed Password in the database.
UserSchema.methods.checkPassword = async function (password, usersPassword) {
  try {
    return await bcrypt.compare(password, usersPassword);
  } catch (error) {
    throw new Error(error);
  }
};

// Generate a JSON Web Token.
UserSchema.methods.generateAuthToken = function () {
  // Create a new JSON Web Token for the user by using the ID and JWT_SECRET env variable.
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // The token will expire after the time specified in the JWT_EXPIRES_IN env variable.
    expiresIn: "7d",
  });
};

// Find a user by the JSON Web Token.
UserSchema.statics.findByToken = async function (token) {
  try {
    // Verify the JSON Web Token by using the JWT_SECRET variable.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user with the decoded ID.
    const user = await this.findById(decoded.id);
    // Return the user.
    return user;
  } catch (error) {
    // If there is an error in one of the above steps, throw an error.
    throw new Error("Invalid Token.");
  }
};

UserSchema.methods.getPublicFields = function () {
  return {
    username: this.username,
    email: this.email,
    role: this.role,
    avatarURL: this.avatarURL,
    genres: this.genres,
    library: this.library,
    wishlist: this.wishlist,
  };
};

module.exports = mongoose.model("User", UserSchema);