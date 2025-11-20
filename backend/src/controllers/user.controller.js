const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  validateEmail,
  validateFullName,
  validateStrongPassword,
} = require("../utils/validators");
const path = require("path");

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, type } = req.body;

    // Validate presence of required fields
    if (!fullName || !email || !password || !type) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate format of email/fullName/password
    if (
      !validateEmail(email) ||
      !validateFullName(fullName) ||
      !validateStrongPassword(password)
    ) {
      return res.status(400).json({ error: "Validation failed." });
    }

    // Validate type must be admin or employee
    if (!["admin", "employee"].includes(type)) {
      return res.status(400).json({ error: "Invalid user type." });
    }

    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ error: "Validation failed. User already exists" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user with type
    await User.create({ fullName, email, password: hash, type });

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

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
    const users = await User.find({}, { password: 0 }); // exclude ONLY password
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
        type: user.type,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  login,
};
