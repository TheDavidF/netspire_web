const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/roles.middleware");

const { getPagos} = require("../controllers/pagos.controller");

router.get("/", authMiddleware,roleMiddleware("ADMIN"), getPagos);


module.exports = router;