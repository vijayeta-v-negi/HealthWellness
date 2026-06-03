const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserHealth",
      required: true,
    },

    exerciseType: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    distance: {
      type: Number,
      default: 0,
    },

    caloriesBurned: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Exercise",
  exerciseSchema
);