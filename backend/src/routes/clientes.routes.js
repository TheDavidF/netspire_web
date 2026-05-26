const express = require('express');
const router = express.Router();
const { getClientes, createCliente, getClienteById, updateCliente, changeStatus} = require('../controllers/clientes.controller');

router.get('/', getClientes);
router.post('/', createCliente);
router.get('/:id', getClienteById);
router.put('/:id', updateCliente);
router.patch('/:id/status', changeStatus);
module.exports = router;