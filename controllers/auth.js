const register = (req, res, next) => {
  res.send("Register Route");
};

const login = (req, res, next) => {
  res.send("Login Route");
};

const forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

const resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
};

module.exports = { register, login, forgotPassword, resetPassword };
