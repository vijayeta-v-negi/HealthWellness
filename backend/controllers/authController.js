const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

// Register

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      weight,
      height,
      goal
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      goal
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login

exports.loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Profile

exports.getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};