const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.post('/add', inventoryController.createInventory);
router.delete('/delete/:id', inventoryController.deleteInventory)
router.get('/search', inventoryController.searchInventory);
router.get('/stats', inventoryController.getStats);

module.exports = router;
