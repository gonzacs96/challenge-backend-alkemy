const { Router } = require('express');
const auth = require('../middleware/auth');
const authRouter=require('./authRouter');
const characterRouter=require('./characterRouter')
const genreRouter=require('./genreRouter')
const movieRouter=require('./movieRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/auth', authRouter);

router.use('/characters',auth,characterRouter);
router.use('/genres',auth, genreRouter);
router.use('/movies',auth,movieRouter)

module.exports = router;
