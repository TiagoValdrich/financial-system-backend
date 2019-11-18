const express = require('express');
const router = express.Router();
const financialResourceController = require('../controllers/financial-resource.controller');

router.get('/api/financial-resource', financialResourceController.getFinancialResources);
router.get('/api/financial-resource/:id', financialResourceController.getFinancialResource);
router.put('/api/financial-resource', financialResourceController.save);
router.delete('/api/financial-resource/:id', financialResourceController.delete);

module.exports = router;