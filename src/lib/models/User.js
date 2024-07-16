// models/User.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  roles: [{ type: String }],
  isActive: { type: Boolean, default: true },
  verification: {
    verified: { type: Boolean, default: false },
    token: { type: String },
  },
  resetPassword: {
    token: { type: String },
    expires: { type: Date },
  },
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error); // Pass error to next middleware
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
