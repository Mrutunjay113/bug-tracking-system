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

// Create a model based on the schema
const User = mongoose?.models?.users || mongoose?.model("users", userSchema);

module.exports = User;
