const {
  Cliente,
  Ticket,
  Pago,
  Instalacion,
} = require("../models");

const getStats = async (req, res) => {

  try {

    // TOTAL CLIENTES

    const clientes = await Cliente.count();

    // TICKETS ABIERTOS

    const ticketsAbiertos = await Ticket.count({

      where: {
        estado: "ABIERTO",
      },

    });

    // PAGOS PENDIENTES

    const pagosPendientes = await Pago.count({

      where: {
        estado: "PENDIENTE",
      },

    });

    // INSTALACIONES PENDIENTES

    const instalacionesPendientes = await Instalacion.count({

      where: {
        estado: "AGENDADA",
      },

    });

    // RESPUESTA

    res.json({

      clientes,
      ticketsAbiertos,
      pagosPendientes,
      instalacionesPendientes,

    });

  } catch (error) {

    res.status(500).json({

      message: "Error al obtener estadísticas",

      error: error.message,

    });

  }

};

module.exports = {
  getStats,
};