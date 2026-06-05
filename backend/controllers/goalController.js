const Goal = require("../models/Goal");
const GoalTracking = require(
  "../models/GoalTracking"
);

exports.createGoal =
  async (req, res) => {
    try {
      const goal =
        await Goal.create({
          ...req.body,
          userId:
            req.user.id,
        });

      res.status(201).json(
        goal
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.getGoals =
  async (req, res) => {
    try {
      const goals =
        await Goal.find({
          userId:
            req.user.id,
        });

      res.json(goals);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.deleteGoal =
  async (req, res) => {
    try {
      await Goal.findByIdAndDelete(
        req.params.id
      );

      await GoalTracking.deleteMany(
        {
          goal:
            req.params.id,
        }
      );

      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.addTracking =
  async (req, res) => {
    try {
      const tracking =
        await GoalTracking.create(
          {
            userId:
              req.user.id,
            goal:
              req.params.id,
            value:
              req.body.value,
          }
        );

      res.status(201).json(
        tracking
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.getTracking =
  async (req, res) => {
    try {
      const tracking =
        await GoalTracking.find({
          goal:
            req.params.id,
        }).sort({
          date: 1,
        });

      res.json(tracking);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };