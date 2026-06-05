const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalType: {
      type: String,
      enum: [
        "Steps",
        "Calories Burned",
        "Calories Consumed",
        "Water Intake",
        "Workout Duration",
      ],
      required: true,
    },

    targetValue: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
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