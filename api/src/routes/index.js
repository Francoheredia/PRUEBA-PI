const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipeRouter');
const recipesRouter = require('./recipesRouter');
const typesRouter = require('./typesRouter');

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/types', typesRouter);
router.use('/recipe', recipeRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
