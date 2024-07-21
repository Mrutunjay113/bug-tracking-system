const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId || null,
    ref: "Team",
    default: null,
  },
  designation: {
    type: String,
    enum: ["Developer", "QA", "UI/UX", "Software Engineer", "Tester"],
    required: true,
  },
  profileImg: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
  },
  availabilityStatus: {
    type: String,
    enum: ["Available", "Busy", "On Leave"],
    default: "Available",
  },

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "issue",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
