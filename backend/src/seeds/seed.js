const bcrypt = require("bcryptjs");

const { Usuario, Plan } = require("../models");

const seed = async () => {
  try {
    console.log("Iniciando seed...");

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword = await bcrypt.hash("123456", 10);

    // =========================
    // ADMIN
    // =========================

    await Usuario.create({
      nombre: "Administrador",
      email: "admin@test.com",
      password: hashedPassword,
      rol: "ADMIN",
    });

    console.log("Admin creado");

    // CREAR CLIENTE
    await Usuario.create({

      nombre: "Cliente Test",

      email: "cliente@test.com",

      password: hashedPassword,

      rol: "CLIENTE",

    });


    // =========================
    // PLANES
    // =========================

    await Plan.bulkCreate([
      {
        nombre: "Basico",
        velocidad_mbps: 10,
        precio_mensual: 149,
        activo: true,
        descripcion: "Plan ideal para navegación básica y redes sociales.", 
      },
      {
        nombre: "Hogar",
        velocidad_mbps: 25,
        precio_mensual: 249,
        activo: true,
        descripcion: "Perfecto para streaming en HD y teletrabajo.", 
      },
      {
        nombre: "Negocio",
        velocidad_mbps: 50,
        precio_mensual: 399,
        activo: true,
        descripcion: "Conectividad estable para pequeñas empresas.", 
      },
      {
        nombre: "Premium",
        velocidad_mbps: 100,
        precio_mensual: 599,
        activo: true,
        descripcion: "Máxima velocidad para gaming y múltiples dispositivos.",
      },
    ]);

    console.log("Planes creados");

    process.exit();
  } catch (error) {
    console.log(error);
  }
    
};

seed();
