const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    estado: {
      type: DataTypes.ENUM("ACTIVO", "SUSPENDIDO", "PENDIENTE"),
      defaultValue: "PENDIENTE",
    },

    /** Fecha de pago
     * dia del mes en que debe realizarse el pago, por ejemplo: 1, 15, 30
     * Se utiliza para generar recordatorios de pago y calcular fechas de vencimiento
     * en base a la fecha actual y el día de pago configurado.
     */

    fecha_pago: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "clientes",
  },
);

module.exports = Cliente;
