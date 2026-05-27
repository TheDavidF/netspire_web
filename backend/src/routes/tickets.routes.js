const express = require("express");
const router = express.Router();

const { getTickets, getTicketById, createTicket, updateTicket, getTicketsCliente } = require("../controllers/tickets.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/roles.middleware");

router.get("/", authMiddleware, roleMiddleware("ADMIN", "TECNICO"), getTickets);
router.get("/mis-tickets", authMiddleware, roleMiddleware("CLIENTE"), getTicketsCliente);
router.post("/", authMiddleware, roleMiddleware("CLIENTE","ADMIN"), createTicket);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN","TECNICO"), updateTicket);


module.exports = router;