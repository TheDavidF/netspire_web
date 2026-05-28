const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const testRoutes = require("./routes/test.routes");

const planesRoutes = require("./routes/planes.routes");

const clientesRoutes = require("./routes/clientes.routes");
const pagosRoutes = require("./routes/pagos.routes");

const ticketsRoutes = require("./routes/tickets.routes");

const instalacionesRoutes = require("./routes/instalaciones.routes");

const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/planes", planesRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/instalaciones", instalacionesRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
