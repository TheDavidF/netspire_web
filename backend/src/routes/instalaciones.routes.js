const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/roles.middleware");

const { getInstalaciones, getMisInstalaciones} = require("../controllers/instalaciones.controller");

router.get("/", authMiddleware, roleMiddleware("ADMIN"), getInstalaciones);
router.get("/mis-instalaciones", authMiddleware, roleMiddleware("TECNICO"), getMisInstalaciones);


module.exports = router;