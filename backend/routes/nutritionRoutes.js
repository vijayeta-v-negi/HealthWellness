const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createNutrition,
  getNutrition,
  deleteNutrition,
} = require(
  "../controllers/nutritionController"
);

router.post(
  "/",
  protect,
  createNutrition
);

router.get(
  "/",
  protect,
  getNutrition
);

router.delete(
  "/:id",
  protect,
  deleteNutrition
);

module.exports = router;