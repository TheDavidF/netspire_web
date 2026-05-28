const express = require("express");

const router = express.Router();

const {
  getStats,
} = require("../controllers/dashboard.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const roleMiddleware = require("../middlewares/roles.middleware");

// STATS ADMIN

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStats
);

module.exports = router;