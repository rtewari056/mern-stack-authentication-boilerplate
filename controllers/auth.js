const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(
        new ErrorResponse("Please provide username, email and password", 400)
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return sendToken(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // Explicitly ing password

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendToken(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    // Generate Reset Token and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${APP_BASE_URL}/passwordreset/${resetToken}`;

    // Reset password message template in HTML
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
  } catch (error) {}
};

const resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
};

const sendToken = (user, statusCode, res) => {
  return res
    .status(statusCode)
    .json({ success: true, token: user.getSignedToken() });
};

module.exports = { register, login, forgotPassword, resetPassword };
