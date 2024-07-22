import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image: { type: String },
  roles: [{ type: String }],
  isActive: { type: Boolean, default: true },
  verification: {
    verified: { type: Boolean, default: false },
    token: { type: String },
  },
  image: { type: String },
  designation: {
    type: String,
    enum: ["Developer", "QA", "UI/UX", "Software Engineer", "Tester"],
    required: true,
  },
  resetPassword: {
    token: { type: String },
    expires: { type: Date },
  },
  status: {
    type: String,
    enum: ["onleave", "vacation", "active"],
    default: "Active",
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
