const Goal = require("../models/Goal");

exports.createGoal = async (
  req,
  res
) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getGoals = async (
  req,
  res
) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateGoal = async (
  req,
  res
) => {
  try {
    const goal =
      await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteGoal = async (
  req,
  res
) => {
  try {
    await Goal.findByIdAndDelete(
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