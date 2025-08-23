import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./configs/dbConnect.js";

dotenv.config();
dbConnect();

const app = express();

// MIDDLEWARES
const corsOptions = {
  origin: ["http://localhost:5173"],
  Credential: true,
};
app.use(cors(corsOptions));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_124",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);
// PASPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES

// APP LISTEN
const port = process.env.APP_PORT || 7001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
