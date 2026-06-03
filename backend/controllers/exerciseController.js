const Exercise = require("../models/Exercise");

exports.createExercise = async (
  req,
  res
) => {
  try {
    const exercise =
      await Exercise.create({
        ...req.body,
        userId: req.user.id,
      });

    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getExercises = async (
  req,
  res
) => {
  try {
    const exercises =
      await Exercise.find({
        userId: req.user.id,
      }).sort({ createdAt: -1 });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteExercise = async (
  req,
  res
) => {
  try {
    await Exercise.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};