const Plan = require("../models/Plan");

const getPlanes = async (req, res) => {
  try {
    const planes = await Plan.findAll();

    res.json(planes);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los planes",
      error: error.message,
    });
  }
};

const getPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan no encontrado" });
    } else {
      res.json(plan);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el plan",
      error: error.message,
    });
  }
};

const createPlan = async (req, res) => {
  const { nombre, velocidad_mbps, precio_mensual, descripcion } = req.body;
  try {
    const plan = await Plan.create({
      nombre,
      velocidad_mbps,
      precio_mensual,
      descripcion,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el plan",
      error: error.message,
    });
  }
};

module.exports = {
  getPlanes,
  getPlanById,
  createPlan,
};
