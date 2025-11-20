const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  validateFullName,
  validateStrongPassword,
  validateEmail,
} = require("../utils/validators");
const path = require("path");

// Update allowed fields: fullName, password; identify by email in body
const updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    if (!validateEmail(email))
      return res.status(400).json({ error: "Validation failed." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const update = {};
    if (typeof fullName !== "undefined") {
      if (!validateFullName(fullName))
        return res.status(400).json({ error: "Validation failed." });
      update.fullName = fullName.trim();
    }
    if (typeof password !== "undefined") {
      if (!validateStrongPassword(password))
        return res.status(400).json({ error: "Validation failed." });
      update.password = await bcrypt.hash(password, 10);
    }

    await User.updateOne({ _id: user._id }, { $set: update });
    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    if (!validateEmail(email))
      return res.status(404).json({ error: "User not found." });

    const result = await User.findOneAndDelete({ email });
    if (!result) return res.status(404).json({ error: "User not found." });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find(
      {},
      { imagePath: 1, fullName: 1, email: 1, _id: 0 }
    );
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    // Enforce single image per user
    if (user.imagePath) {
      return res
        .status(400)
        .json({ error: "Image already exists for this user." });
    }

    // multer has already stored the file if filter passed
    if (!req.file) {
      return res.status(400).json({
        error: "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    const relPath = path.posix.join("/images", path.basename(req.file.path));
    await User.updateOne({ _id: user._id }, { $set: { imagePath: relPath } });

    return res
      .status(201)
      .json({ message: "Image uploaded successfully.", filePath: relPath });
  } catch (err) {
    if (err && err.message === "INVALID_FORMAT") {
      return res.status(400).json({
        error: "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
      });
    }
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email))
      return res.status(400).json({ error: "Invalid credentials." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials." });

    return res.status(200).json({
      message: "Login successful.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        imagePath: user.imagePath || null,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  login,
};
