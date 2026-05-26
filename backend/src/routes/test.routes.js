const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const rolesMiddleware = require("../middlewares/roles.middleware");

router.get(
  "/private",

  authMiddleware,

  rolesMiddleware("ADMIN"),

  (req, res) => {
    res.json({
      message: "Ruta privada ADMIN",
      usuario: req.user,
    });
  },
);

module.exports = router;
