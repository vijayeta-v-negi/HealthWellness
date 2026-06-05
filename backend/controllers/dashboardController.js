const Exercise = require(
  "../models/Exercise"
);

const Nutrition = require(
  "../models/Nutrition"
);

const Goal = require(
  "../models/Goal"
);

const GoalTracking = require(
  "../models/GoalTracking"
);

exports.getDashboardStats =
  async (req, res) => {
    try {
      const exercises =
        await Exercise.find({
          userId:
            req.user.id,
        });

      const foods =
        await Nutrition.find({
          userId:
            req.user.id,
        });

      const goals =
        await Goal.find({
          userId:
            req.user.id,
        });

      const tracking =
        await GoalTracking.find({
          userId:
            req.user.id,
        });

      const totalCaloriesBurned =
        exercises.reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.caloriesBurned,
          0
        );

      const totalCaloriesConsumed =
        foods.reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.calories,
          0
        );

      const totalWorkouts =
        exercises.length;

      const totalMeals =
        foods.length;

      let goalCompletion = 0;

      if (goals.length > 0) {
        goalCompletion =
          goals.reduce(
            (
              total,
              goal
            ) => {
              const goalEntries =
                tracking.filter(
                  (t) =>
                    t.goal.toString() ===
                    goal._id.toString()
                );

              const current =
                goalEntries.reduce(
                  (
                    sum,
                    item
                  ) =>
                    sum +
                    item.value,
                  0
                );

              return (
                total +
                Math.min(
                  (
                    current /
                    goal.targetValue
                  ) *
                    100,
                  100
                )
              );
            },
            0
          ) /
          goals.length;
      }

      res.json({
        totalCaloriesBurned,
        totalCaloriesConsumed,
        totalWorkouts,
        totalMeals,
        goalCompletion:
          Math.round(
            goalCompletion
          ),
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };