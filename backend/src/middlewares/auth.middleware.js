const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // LEER HEADER

    const authHeader = req.headers.authorization;

    // VALIDAR TOKEN

    if (!authHeader) {
      return res.status(401).json({
        message: "Token requerido",
      });
    }

    // EXTRAER TOKEN

    const token = authHeader.split(" ")[1];

    // VERIFICAR JWT

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // GUARDAR USUARIO

    req.user = decoded;

    // CONTINUAR

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

module.exports = authMiddleware;
