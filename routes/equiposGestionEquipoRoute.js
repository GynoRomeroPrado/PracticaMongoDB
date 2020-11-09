const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getEquipos,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo
} = require('../controllers/equiposGestionEquipoController');


const router = Router();

router.get('/', getEquipos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del equipo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearEquipo);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del equipos es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarEquipo);

router.delete('/:id',
    validarJWT,
    eliminarEquipo);



module.exports = router; //para exportar