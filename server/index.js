require(dotenv).config();
const express = require("express");
const cors = require("cors");
const connectWithDb = require("./config/db");
const cloudinary = require("cloudinary").v2;
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

connectWithDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cookieParser());
app.use(
  cookieParser({
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }),
);

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
    sameSite: "none",
    httpOnly: true,
  }),
  app.json(express.json()),

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  ),
);

app.use("/", require("./routes"));

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.error("Error while connecting the server:", err);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
