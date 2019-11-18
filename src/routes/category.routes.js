const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/api/category', categoryController.getCategories);
router.get('/api/category/:id', categoryController.getCategory);
router.put('/api/category', categoryController.save);
router.delete('/api/category/:id', categoryController.delete);

module.exports = router;