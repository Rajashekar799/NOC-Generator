const express = require('express');
const router = express.Router();
const nocController = require('../controllers/nocController');

router.post('/', nocController.createNOC);
router.get('/', nocController.getAllNOCs);
router.get('/:id', nocController.getNOCById);
router.delete('/:id', nocController.deleteNOC);
router.get('/:id/pdf', nocController.generatePDF);

module.exports = router;
