const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  validateEmail,
  validateFullName,
  validateStrongPassword,
} = require("../utils/validators");

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (
      !validateEmail(email) ||
      !validateFullName(fullName) ||
      !validateStrongPassword(password)
    ) {
      return res.status(400).json({ error: "Validation failed." });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      // Do not leak info; but creation conflict is 400 per assignment examples
      return res.status(400).json({ error: "Validation failed." });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hash });

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createUser,
};
