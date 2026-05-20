const { DataTypes } = require ("sequelize");
const sequelize = require("../config/database");

const Plan = sequelize.define("Plan", {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    velocidad_mbps: {
        type: DataTypes.INTEGER,
        allowNull: false,     
    },

    precio_mensual: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

},
    {
        tableName: "planes",
    });

module.exports = Plan;