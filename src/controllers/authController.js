import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username: username,
      password: hashedPass,
      ismfaactive: false,
    });

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Registering User",
      message: error,
    });
  }
};

export const login = async (req, res) => {
  res.status(200).json({
    message: "Logged in succesffully",
    user: req.user.username,
    ismfaactive: req.user.ismfaactive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Logged in succesffully",
      user: req.user.username,
      ismfaactive: req.user.ismfaactive,
    });
  } else {
    res.status(401).json({
      message: "UnAuthorized User",
    });
  }
};

export const logout = async (req, res) => {
  if (!req.user) res.status(400).json({ message: "UnAuthorized User" });

  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User not logged in" });
    res.status(200).json({ message: "Logged Out Successfully" });
  });
};

export const setupTwofa = async (req, res) => {
  const user = req.user;
  let secret = speakeasy.generateSecret();

  await UserModel.update(user.id, {
    twofactorsecret: secret.base32,
    ismfaactive: true,
  });

  const url = speakeasy.otpauthURL({
    secret: secret.base32,
    label: `${req.user.username}`,
    issuer: "craftwell.com",
    encoding: "base32",
  });
  const qrimageurl = await qrCode.toDataURL(url);

  res.status(200).json({
    message: "MFA Setup Successfully",
    secret: secret.base32,
    qrcode: qrimageurl,
  });
};

export const verifyTwofa = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp({
    secret: user.twofactorsecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      },
    );

    res.status(200).json({
      message: "2FA verified successfully",
      token: jwtToken,
    });
  } else {
    res.status(400).json({
      message: "2FA Verification Failed",
    });
  }
};

export const resetTwofa = async (req, res) => {
  try {
    const user = req.user;

    await UserModel.update(user.id, {
      twofactorsecret: "",
      ismfaactive: false,
    });

    res.status(200).json({
      message: "2FA Reset Successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Resetting 2FA",
      error: error,
    });
  }
};
