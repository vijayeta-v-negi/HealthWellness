const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserHealth",
      required: true,
    },

    goalType: {
      type: String,
      required: true,
    },

    targetValue: {
      type: Number,
      required: true,
    },

    currentValue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Goal",
  goalSchema
);