import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  authStatus,
  logout,
  setupTwofa,
  verifyTwofa,
  resetTwofa,
} from "../controllers/authController.js";

const router = Router();

//REGISTRATION ROUTE
router.post("/register", register);

// LOGIN ROUTE
router.post("/login", passport.authenticate("local"), login);

//AUTH STATUS ROUTE
router.get("/auth-status", authStatus);

//LOGOUT ROUTE
router.post("/logout", logout);

// ===== 2FA ===== //

//SETUP ROUTE
router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(400).json({
      message: "unauthorized user",
    });
  },
  setupTwofa,
);

// LOGIN ROUTE
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(400).json({
      message: "unauthorized user",
    });
  },
  verifyTwofa,
);

//AUTH STATUS ROUTE
router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(400).json({
      message: "unauthorized user",
    });
  },
  resetTwofa,
);

export default router;
