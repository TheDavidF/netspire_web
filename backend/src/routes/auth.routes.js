const express = require("express");

const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { login, logout, getMe } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

module.exports = router;
