const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();

const authRouter = require("./routes/authRouter");
const meRouter = require("./routes/meRouter");
const usersRouter = require("./routes/usersRouter");
const gameRouter = require("./routes/gameRouter");
const libraryRouter = require("./routes/libraryRouter");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({
  limit: "10mb",
}));
app.use(morgan("dev"));
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: "fb77690e5d3e72deee6035b3a7da12ead798bd2261fd40b612ec8b6f57c9863d",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/me", meRouter);
app.use("/games", gameRouter);
app.use("/library", libraryRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
