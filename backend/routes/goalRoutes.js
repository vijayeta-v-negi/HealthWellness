const express = require(
  "express"
);

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createGoal,
  getGoals,
  deleteGoal,
  addTracking,
  getTracking,
} = require(
  "../controllers/goalController"
);

router.post(
  "/",
  protect,
  createGoal
);

router.get(
  "/",
  protect,
  getGoals
);

router.delete(
  "/:id",
  protect,
  deleteGoal
);

router.post(
  "/:id/track",
  protect,
  addTracking
);

router.get(
  "/:id/tracking",
  protect,
  getTracking
);

module.exports = router;