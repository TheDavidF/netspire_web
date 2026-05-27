const Ticket = require("../models/Ticket");
const Cliente = require("../models/Cliente");
const Usuario = require("../models/Usuario");

const updateTicket = async (req, res) => {
  const { id } = req.params;

  const { estado, usuarioId } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket no encontrado",
      });
    }

    // VALIDAR ESTADO

    const estadosValidos = ["ABIERTO", "EN_PROCESO", "RESUELTO", "CERRADO"];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        message: "Estado no válido",
      });
    }

    // ADMIN

    if (req.user.rol === "ADMIN") {
      // SI ENVÍAN TÉCNICO

      if (usuarioId) {
        const tecnico = await Usuario.findByPk(usuarioId);

        if (!tecnico || tecnico.rol !== "TECNICO") {
          return res.status(400).json({
            message: "Técnico no válido",
          });
        }

        ticket.tecnicoId = tecnico.id;
      }

      ticket.estado = estado;

      await ticket.save();

      return res.json({
        message: "Ticket actualizado exitosamente",

        ticket,
      });
    }

    // TÉCNICO

    if (req.user.rol === "TECNICO") {
      // VALIDAR QUE EL TICKET LE PERTENECE

      if (ticket.tecnicoId !== req.user.id) {
        return res.status(403).json({
          message: "No puedes modificar este ticket",
        });
      }

      ticket.estado = estado;

      await ticket.save();

      return res.json({
        message: "Ticket actualizado exitosamente",

        ticket,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el ticket",

      error: error.message,
    });
  }
};


const createTicket = async (req, res) => {
  const { titulo, descripcion, categoria, prioridad, ClienteId } = req.body;

  try {
    let idCliente;
    let cliente;
    if (req.user.rol == "ADMIN") {
      idCliente = ClienteId;
      cliente = await Cliente.findByPk(idCliente);
    } else {
      if (ClienteId != req.user.id) {
        return res.status(403).json({
          message: "Acceso denegado",
        });
      }
      cliente = await Cliente.findOne({
        where: {
          usuarioId: req.user.id,
        },
      });
    }

    // VALIDAR CLIENTE

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    // CREAR TICKET

    const ticket = await Ticket.create({
      titulo,
      descripcion,
      categoria,
      prioridad,
      clienteId: cliente.id,
    });

    // RESPUESTA

    return res.status(201).json({
      message: "Ticket creado exitosamente",

      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear ticket",

      error: error.message,
    });
  }
};

const getTicketsCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        usuarioId: req.user.id,
      },
    });

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    const tickets = await Ticket.findAll({
      where: {
        clienteId: cliente.id,
      },
    });
    res.json({
      message: "Tickets obtenidos exitosamente",
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los tickets",
      error: error.message,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json({
      message: "Tickets obtenidos exitosamente",
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los tickets",
      error: error.message,
    });
  }
};

module.exports = {
  getTickets,
  getTicketsCliente,
  createTicket,
  updateTicket,
};
