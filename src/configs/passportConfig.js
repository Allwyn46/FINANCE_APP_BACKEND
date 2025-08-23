import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import { supabase } from "./dbConnect.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = UserModel.findByUsername({ username });

      if (!user) {
        return done(null, false, {
          message: "User Not Found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) return done(null, user);
      else
        return done(null, false, {
          message: "Incorrect Password",
        });
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = UserModel.findById(id);
  } catch (error) {}
});
