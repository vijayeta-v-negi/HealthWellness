const mongoose = require(
  "mongoose"
);

const goalTrackingSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      goal: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Goal",
        required: true,
      },

      value: {
        type: Number,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "GoalTracking",
    goalTrackingSchema
  );