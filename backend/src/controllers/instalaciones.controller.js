const Instalacion = require("../models/Instalacion");
const Usuario = require("../models/Usuario");
const Cliente = require("../models/Cliente");


const updateInstalacion = async (req, res) => {
  const { id } = req.params;
  const { estado, notas } = req.body;
    try {
        const instalacion = await Instalacion.findByPk(id);
        if (!instalacion) {
            return res.status(404).json({
                message: "Instalación no encontrada"
            });
        }
        const estadosValidos = ["AGENDADA", "EN_PROGRESO", "COMPLETADA", "FALLIDA"];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({
                message: "Estado no válido"
            });
        }

        if(estado === "COMPLETADA"){
            instalacion.fecha_realizadad = new Date();
        } 
        instalacion.estado = estado;
        instalacion.notas = notas;
        await instalacion.save();
        res.json({
            message: "Instalación actualizada exitosamente",
            instalacion
        });
    }catch (error) {
        res.status(500).json({
            message: "Error al actualizar la instalación",
            error: error.message
        });
    }

}


const createInstalacion = async (req, res) => {
  const { fecha_agendada, ClienteId, notas, equipo_instalado, tecnicoId } = req.body;

  try {
    const cliente = await Cliente.findByPk(ClienteId);
    const tecnico = await Usuario.findByPk(tecnicoId);

    if (!tecnico || tecnico.rol !== "TECNICO") {
      return res.status(404).json({
        message: "Técnico no encontrado o no es un técnico",
      });
    }

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    const instalacion = await Instalacion.create({
      fecha_agendada,
      ClienteId,
      notas,
      equipo_instalado,
      tecnicoId,
    });
    res.status(201).json({
      message: "Instalación creada exitosamente",
      instalacion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la instalación",
      error: error.message,
    });
  }
}

const getMisInstalaciones = async (req, res) => {
  try {
    const instalaciones = await Instalacion.findAll({
      where: {
        tecnicoId: req.user.id,
      },
    });

    res.json({
      message: "Instalaciones obtenidas exitosamente",
      instalaciones,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las instalaciones",
      error: error.message,
    });
  }
};

const getInstalaciones = async (req, res) => {
  try {
    const instalaciones = await Instalacion.findAll();
    res.json({
      message: "Instalaciones obtenidas exitosamente",
      instalaciones,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las instalaciones",
      error: error.message,
    });
  }
};

module.exports = {
  getInstalaciones,
  getMisInstalaciones,
};
