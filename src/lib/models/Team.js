const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teamleader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Member collection
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // Reference to the Member collection
    },
  ],
  TeamRole: {
    type: String,
    enum: ["Developer", "QA", "UI/UX", "Tester"],
    required: true,
  },
  description: {
    type: String,
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

const TeamModel = mongoose.models.Team || mongoose.model("Team", TeamSchema);

module.exports = TeamModel;
