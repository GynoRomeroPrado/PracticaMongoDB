const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getPartess,
    crearPartes,
    actualizarPartes,
    eliminarPartes
} = require('../controllers/partesGestionEquipoController');


const router = Router();

router.get('/', getPartess);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de las partes es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPartes);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de las partes es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPartes);

router.delete('/:id',
    validarJWT,
    eliminarPartes);



module.exports = router; //para exportar