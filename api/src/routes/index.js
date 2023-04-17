const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./dogsRoutes.js');
const tempRoutes = require('./tempRoutes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoutes);
router.use('/temperaments', tempRoutes);


module.exports = router;


//http://localhost:3001/dogs
//http://localhost:3001/temperaments