const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  image: {
    type: String, // URL or path to the image
    default: "",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Completed"],
    default: "Open",
  },
  issueType: {
    type: String,
    enum: ["UI/UX", "Developer", "QA", "Other"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const IssueModel =
  mongoose.models.Issue || mongoose.model("Issue", IssueSchema);

module.exports = IssueModel;
