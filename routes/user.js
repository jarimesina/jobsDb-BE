const express = require("express");

const router = express.Router();

const userController = require("../controllers/UserController");
const auth = require("../middleware/auth");

router.get("/user/me", auth, userController.getProfile);

module.exports = router; // export to use in server.js
