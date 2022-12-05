const crypto = require("crypto");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"
const sendEmail = require("../utils/sendEmail");

// @description     Register a user
// @route           POST /api/auth/register
// @access          Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;
    // Check if any of them is undefined
    if (!name || !email || !password) {
      return next(
        new ErrorResponse("Please provide name, email and password", 400)
      );
    }

    // Check if user already exists in our DB
    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Register and store the new user
    const user = await User.create(
      // If there is no picture present, remove 'profilePic'
      profilePic === undefined || profilePic.length === 0
        ? {
            name,
            email,
            password,
          }
        : {
            name,
            email,
            password,
            profilePic,
          }
    );

    return sendAuth(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

// @description     Login a user
// @route           POST /api/auth/login
// @access          Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // Explicitly adding password

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendAuth(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

// @description     Forgot password
// @route           POST /api/auth/forgotPassword
// @access          Public
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
    const resetUrl = `${process.env.APP_BASE_URL}/passwordReset/${resetToken}`;

    // Reset password email template in HTML
    const html = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: "Your password can be reset by clicking the link below",
        html,
      });

      return res
        .status(200)
        .json({ success: true, data: "Email Sent Successfully" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    return next(error);
  }
};

// @description     Reset password
// @route           PUT /api/auth/resetPassword/:resetToken
// @access          Public
const resetPassword = async (req, res, next) => {
  const { password } = req.body;

  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    user.password = password; // Modify existing password
    // As we already used the "resetPasswordToken", we will set it to "undefined"
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const sendAuth = (user, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    token: user.getSignedToken(),
    expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
  });
};

module.exports = { register, login, forgotPassword, resetPassword };
