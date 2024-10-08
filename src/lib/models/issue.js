const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

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
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
    enum: ["Open", "In Progress", "Closed", "In Review"],
    default: "Open",
  },
  dueDate: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    enum: ["UI/UX", "Developer", "Tester"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //show the status object in which in progress, open, closed, in review are the keys and their values are dates user pass the key and value
  statusDates: {
    Open: {
      type: Date,
      default: Date.now,
    },
    InProgress: {
      type: Date,
      default: null,
    },
    Closed: {
      type: Date,
      default: null,
    },
    InReview: {
      type: Date,
      default: null,
    },
  },

  type: {
    type: String,
    enum: ["feature", "bug", "improvement", "other"],
    default: "bug",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [CommentSchema],
});
const IssueModel =
  mongoose.models.Issue || mongoose.model("Issue", IssueSchema);

module.exports = IssueModel;
