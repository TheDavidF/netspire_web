const Cliente = require("../models/Cliente");
const Usuario = require("../models/Usuario");
const Plan = require("../models/Plan");
const bcrypt = require("bcryptjs");

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    cliente.estado = estado;
    await cliente.save();
    res.json({
      message: "Estado del cliente actualizado exitosamente",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el estado del cliente",
      error: error.message,
    });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { direccion, telefono } = req.body;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    cliente.direccion = direccion;
    cliente.telefono = telefono;
    await cliente.save();

    res.json({
      message: "Cliente actualizado exitosamente",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el cliente",
      error: error.message,
    });
  }
};

const createCliente = async (req, res) => {
  const { nombre, email, password, direccion, telefono } = req.body;
  try {
    const usuario = await Usuario.create({
      nombre,
      email,
      password: await bcrypt.hash(password, 10),
      rol: "CLIENTE",
    });

    const cliente = await Cliente.create({
      direccion,
      telefono,
      usuarioId: usuario.id,
    });

    res.status(201).json({
      message: "Cliente creado exitosamente",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el cliente",
      error: error.message,
    });
  }
};

const getClientes = async (req, res) => {

  try {

    const clientes = await Cliente.findAll({

      include: [

        {
          model: Usuario,

          attributes: [
            "id",
            "nombre",
            "email",
            "rol",
            "activo",
          ],
        },

        {
          model: Plan,

          attributes: [
            "id",
            "nombre",
            "precio_mensual",
            "velocidad_mbps",
          ],
        },

      ],

    });

    res.json({

      clientes,

    });

  } catch (error) {

    res.status(500).json({

      message: "Error al obtener los clientes",

      error: error.message,

    });

  }

};

const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    } else {
      res.json(cliente);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

const actualizarCliente = async (req, res) => {};

module.exports = {
  getClientes,
  createCliente,
  getClienteById,
  updateCliente,
  changeStatus,
};
