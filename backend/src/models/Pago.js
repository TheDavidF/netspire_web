const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pago = sequelize.define(
  "Pago",
  {
    monto: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },

    fecha_pago: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    estado: {
      type: DataTypes.ENUM("PAGADO", "PENDIENTE", "VENCIDO"),
      defaultValue: "PENDIENTE",
    },

    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "pagos",
  },
);

module.exports = Pago;
