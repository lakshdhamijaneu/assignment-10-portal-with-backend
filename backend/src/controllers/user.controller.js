const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  validateEmail,
  validateFullName,
  validateStrongPassword,
} = require("../utils/validators");

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
      return res.status(400).json({ error: "Validation failed. User already exists" });
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

module.exports = {
  createUser,
};
