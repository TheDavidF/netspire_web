require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/database");

//import de modelos para sincronizar con la base de datos
require("./src/models");

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Conexión a MySQL exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MySQL:", error);
  });