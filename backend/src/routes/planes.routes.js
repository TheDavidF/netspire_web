const express = require('express');
const router = express.Router();
const { getPlanes, getPlanById, createPlan } = require('../controllers/planes.controller');

router.get('/', getPlanes);
router.get('/:id', getPlanById);
router.post('/', createPlan);
module.exports = router;

