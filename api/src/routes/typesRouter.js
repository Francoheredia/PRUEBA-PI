const { Router } = require('express');
const getTypesDiets = require('../Controllers/types');
const router = Router();

router.get('/', getTypesDiets);

module.exports = router;
