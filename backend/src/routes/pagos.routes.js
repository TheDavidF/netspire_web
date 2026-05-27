const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/roles.middleware");

const { getPagos, getPagosByCliente, createPago, updatePago} = require("../controllers/pagos.controller");

router.get("/", authMiddleware,roleMiddleware("ADMIN"), getPagos);
router.get("/cliente/:id", authMiddleware, roleMiddleware("ADMIN","CLIENTE"), getPagosByCliente);
router.post("/", authMiddleware, roleMiddleware("ADMIN"), createPago);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updatePago);

module.exports = router;