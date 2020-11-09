const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getComponentees,
    crearComponente,
    actualizarComponente,
    eliminarComponente
} = require('../controllers/componentesGestionEquipoController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getComponentees);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del componente es obligatorio').not().isEmpty(),
        check('partes', 'El id de la partes debe ser valido').isMongoId(),
        validarCampos
    ],
    crearComponente);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del componente es obligatorio').not().isEmpty(),
        check('partes', 'El id de la partes debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarComponente);

router.delete('/:id', validarJWT, eliminarComponente);



module.exports = router; //para exportar