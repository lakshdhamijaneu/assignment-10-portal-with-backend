const express = require("express");
const { createUser } = require("../controllers/user.controller");
const { upload } = require('../middlewares/upload');

const {
  updateUser,
  deleteUser,
  uploadImage,
  login,
} = require("../controllers/user.controller");

const router = express.Router();

// Assignment endpoints
router.post("/", createUser);
router.put("/edit", updateUser);
router.delete("/:email", deleteUser);
router.post('/uploadImage', upload.single('image'), uploadImage);
router.post("/login", login);

module.exports = router;
