const express = require("express");

const router = express.Router();

const userController = require("../controllers/UserController");
const auth = require("../middleware/auth");

router.get("/user/me", auth, userController.getProfile);

router.post("/register", userController.registerUser);

// TODO: add auth when done
router.post("/user", auth, userController.updateUser);
router.post("/normalUser", auth, userController.updateNormalUser);

module.exports = router; // export to use in server.js
