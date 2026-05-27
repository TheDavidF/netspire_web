const { Pago, Cliente, Usuario } = require("../models");


const updatePago = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try{
        const pago = await Pago.findByPk(id);
        
        if(!pago){
            return res.status(404).json({
                message: "Pago no encontrado"
            });
        }

        const estadosValidos = ["PENDIENTE", "PAGADO", "VENCIDO"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({
                message: "Estado no válido"
            });
        }

        pago.estado = estado;
        await pago.save();

        res.json({
            message: "Pago actualizado exitosamente",
            pago
        });
    
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el pago",
            error: error.message
        });
    }
}

const createPago = async (req, res) => {
  try {
    const { clienteId, monto, estado, metodo_pago, fecha_vencimiento } =
      req.body;

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    const fechaVencimiento = new Date();

    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
    const pago = await Pago.create({
      clienteId,
      monto,
      estado,
      metodo_pago,
      fecha_vencimiento: fechaVencimiento,
    });

    return res.status(201).json({
      message: "Pago registrado exitosamente",

      pago,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al registrar pago",
      error: error.message,
    });
  }
};

const getPagosByCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    if (req.user.rol == cliente && cliente.usuarioId !== req.user.id) {
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
  const { estado, mes } = req.query;
  try {
    const where = {};
    if (estado) {
      where.estado = estado;
    } else if (mes) {
      where.mes = mes;
    }
    const pagos = await Pago.findAll({
      where,
      include: [
        {
          model: Cliente,
          include: [Usuario],
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
};

module.exports = {
  getPagos,
  getPagosByCliente,
  createPago,
  updatePago,
};
