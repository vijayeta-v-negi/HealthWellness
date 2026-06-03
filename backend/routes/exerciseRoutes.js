const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createExercise,
  getExercises,
  deleteExercise,
} = require(
  "../controllers/exerciseController"
);

router.post(
  "/",
  protect,
  createExercise
);

router.get(
  "/",
  protect,
  getExercises
);

router.delete(
  "/:id",
  protect,
  deleteExercise
);

module.exports = router;