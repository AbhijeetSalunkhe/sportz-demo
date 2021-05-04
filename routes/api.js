const express = require('express');
const router = express.Router();
const helper = require('./../helper/helper.js');
const validation = require('./../middleware/validation.js');
var CountryController = require('../controllers/api/CountryController.js')

// Country management
router.post('/country', helper.upload.single('flag'), validation.country, CountryController.createCountry);
router.get('/country/:id', CountryController.getCountry);
router.get('/countries', CountryController.getCountries);

module.exports = router;