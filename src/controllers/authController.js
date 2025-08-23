import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

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
export const authStatus = () => {};
export const logout = () => {};
export const setupTwofa = () => {};
export const verifyTwofa = () => {};
export const resetTwofa = () => {};
