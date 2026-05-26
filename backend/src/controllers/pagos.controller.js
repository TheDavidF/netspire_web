const {Pago,Cliente,Usuario} = require("../models");



const getPagosByCliente = async (req, res) => {

  const { id } = req.params;

  try {

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {

      return res.status(404).json({
        message: "Cliente no encontrado",
      });

    }

    if(req.user.rol == cliente && cliente.usuarioId !== req.user.id){
        res.status(403).json({
            message: "Acceso denegado",
        });
    } 

    const pagos = await Pago.findAll({

      where: {
        clienteId: id,
      },

      include: [
        {
          model: Cliente,

          include: [Usuario],
        },
      ],

    });

    return res.json(pagos);

  } catch (error) {

    return res.status(500).json({
      message: "Error al obtener pagos",
      error: error.message,
    });

  }

};

const getPagos = async (req, res) => {
    const {estado, mes} = req.query;
    try {
        const where = {};
        if (estado) {
            where.estado = estado;
        } else if (mes) {
            where.mes = mes;
        }
        const pagos = await Pago.findAll({
            where,
            include:[
                {
                    model: Cliente,
                    include: [Usuario,],
                },
            ],
        });

        res.json({
            message: "Pagos obtenidos exitosamente",
            pagos,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los pagos",
            error: error.message,
        });
    }
}


module.exports = {
    getPagos,
};