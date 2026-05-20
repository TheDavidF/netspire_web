const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Instalacion = sequelize.define("Instalacion", {

    fecha_agendada: {
        type: DataTypes.DATE,
        allowNull: true,

    },

    fecha_realizada: {
        type: DataTypes.DATE,
        allowNull: true,

    },

    estado: {
        type: DataTypes.ENUM(
            "AGENDADA",
            "EN_PROGRESO",
            "COMPLETADA",
            "FALLIDA"
        ),
        defaultValue:"AGENDADA",
    },

    notas: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    equipo_instalado: {
        type: DataTypes.STRING,
        allowNull:true,
    },
},
    {
        tableName: "instalaciones",
    }
);

module.exports = Instalacion;