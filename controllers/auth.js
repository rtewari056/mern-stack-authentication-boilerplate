const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide username, email and password",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password"); // Explicitly returning password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ success: true, token: "This is an example token" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

const resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
};

module.exports = { register, login, forgotPassword, resetPassword };
