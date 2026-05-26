const rolesMiddleware = (...rolesPermitidos) => {

  return (req, res, next) => {

    // VERIFICAR ROL
    if (
      !rolesPermitidos.includes(req.user.rol)
    ) {

      return res.status(403).json({
        message: "Acceso denegado",
      });

    }

    // CONTINUAR
    next();

  };

};

module.exports = rolesMiddleware;