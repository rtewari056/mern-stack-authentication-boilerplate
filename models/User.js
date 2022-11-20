const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please provide a username"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ], // Adding validation for email
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false, // Whenever we query for a user, do we want to return password as well
    },
    resetPasswordToken: String, // String is shorthand for {type: String}
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Middleware before saving a document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Assign a "matchPasswords" function to the "methods" object of our "UserSchema"
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
