const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Usuario } = require("../models");

const getMe = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const usuario = await Usuario.findByPk(usuarioId, {
      attributes: { exclude: ["password"] },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // RECIBIR DATOS
    const { email, password } = req.body;

    // BUSCAR USUARIO

    const usuario = await Usuario.findOne({
      where: { email },
    });

    // VALIDAR USUARIO

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // COMPARAR PASSWORD

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({
        message: "Password incorrecta",
      });
    }

    // GENERAR JWT

    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );
    // RESPUESTA

    res.json({
      message: "Login exitoso",

      token,

      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.json({
    message: "Sesión cerrada exitosamente",
  });
};

module.exports = {
  login,
  logout,
  getMe,
};
