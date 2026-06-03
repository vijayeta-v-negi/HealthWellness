const Nutrition = require(
  "../models/Nutrition"
);

exports.createNutrition = async (
  req,
  res
) => {
  try {
    const nutrition =
      await Nutrition.create({
        ...req.body,
        userId: req.user.id,
      });

    res.status(201).json(nutrition);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getNutrition = async (
  req,
  res
) => {
  try {
    const foods =
      await Nutrition.find({
        userId: req.user.id,
      }).sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteNutrition = async (
  req,
  res
) => {
  try {
    await Nutrition.findByIdAndDelete(
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