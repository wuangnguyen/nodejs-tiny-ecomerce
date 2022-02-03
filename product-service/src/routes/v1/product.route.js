const express = require('express');
const container = require('../../container');
const router = express.Router();

const productController = container.get('ProductController');

router.route('/').get(productController.find);

module.exports = router;
