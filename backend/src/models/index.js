const Usuario = require("./Usuario");
const Plan = require("./Plan");
const Cliente = require("./Cliente");
const Pago = require("./Pago");
const Ticket = require("./Ticket");
const Instalacion = require("./Instalacion");


// Relaciones

//usuario - cliente
Cliente.belongsTo(Usuario);
Usuario.hasOne(Cliente);

//cliente - plan
Cliente.belongsTo(Plan);
Plan.hasMany(Cliente);

//cliente - pago
Pago.belongsTo(Cliente);
Cliente.hasMany(Pago);

//cliente - ticket
Ticket.belongsTo(Cliente);
Cliente.hasMany(Ticket);

//cliente - instalacion
Instalacion.belongsTo(Cliente);
Cliente.hasMany(Instalacion);

module.exports = {
    Usuario,
    Plan,
    Cliente,
    Pago,
    Ticket,
    Instalacion,
};