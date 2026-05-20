const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ticket = sequelize.define("Ticket", {

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    categoria: {
        type: DataTypes.ENUM(
            "CONEXION",
            "FACTURACION",
            "EQUIPO",
            "OTRO"
        ),
        allowNull: false,
    },

    prioridad: {
        type: DataTypes.ENUM(
            "BAJA",
            "NORMAL",
            "ALTA",
            "URGENTE"
        ),
        defaultValue: "NORMAL",
    },

    estado: {
        type: DataTypes.ENUM(
            "ABIERTO",
            "EN_PROCESO",
            "RESUELTO",
            "CERRADO"
        ),
        defaultValue: "ABIERTO",
    },
},
    {
        tableName: "tickets",
    }

);

module.exports = Ticket;