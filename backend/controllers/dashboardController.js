const Exercise = require(
  "../models/Exercise"
);

const Nutrition = require(
  "../models/Nutrition"
);

const Goal = require("../models/Goal");

exports.getDashboardStats =
  async (req, res) => {
    try {
      const exercises =
        await Exercise.find({
          userId: req.user.id,
        });

      const foods =
        await Nutrition.find({
          userId: req.user.id,
        });

      const goals = await Goal.find({
        userId: req.user.id,
      });

      const totalCaloriesBurned =
        exercises.reduce(
          (acc, item) =>
            acc + item.caloriesBurned,
          0
        );

      const totalMeals =
        foods.length;

      const totalWorkouts =
        exercises.length;

      let goalCompletion = 0;

      if (goals.length > 0) {
        goalCompletion =
          goals.reduce(
            (acc, goal) =>
              acc +
              (goal.currentValue /
                goal.targetValue) *
                100,
            0
          ) / goals.length;
      }

      res.json({
        totalCaloriesBurned,
        totalMeals,
        totalWorkouts,
        goalCompletion:
          Math.round(goalCompletion),
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };