const Usuario = require("./Usuario");
const Plan = require("./Plan");
const Cliente = require("./Cliente");
const Pago = require("./Pago");
const Ticket = require("./Ticket");
const Instalacion = require("./Instalacion");

// usuario - cliente

Cliente.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Usuario.hasOne(Cliente, {
  foreignKey: "usuarioId",
});

// cliente - plan

Cliente.belongsTo(Plan, {
  foreignKey: "planId",
});

Plan.hasMany(Cliente, {
  foreignKey: "planId",
});

// cliente - pago

Pago.belongsTo(Cliente, {
  foreignKey: "clienteId",
});

Cliente.hasMany(Pago, {
  foreignKey: "clienteId",
});

// cliente - ticket

Ticket.belongsTo(Cliente, {
  foreignKey: "clienteId",
});

Cliente.hasMany(Ticket, {
  foreignKey: "clienteId",
});

// cliente - instalacion

Instalacion.belongsTo(Cliente, {
  foreignKey: "clienteId",
});

Cliente.hasMany(Instalacion, {
  foreignKey: "clienteId",
});

// ticket - tecnico

Ticket.belongsTo(Usuario, {
  foreignKey: "tecnicoId",
});

Usuario.hasMany(Ticket, {
  foreignKey: "tecnicoId",
});

module.exports = {
  Usuario,
  Plan,
  Cliente,
  Pago,
  Ticket,
  Instalacion,
};