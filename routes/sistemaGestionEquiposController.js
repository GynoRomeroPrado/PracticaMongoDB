const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getSistemaes,
    crearSistema,
    actualizarSistema,
    eliminarSistema
} = require('../controllers/sistemaGestionEquipoController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getSistemaes);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del sistema es obligatorio').not().isEmpty(),
        check('equipo', 'El id del equipo debe ser valido').isMongoId(),
        check('componente', 'El id del comoponente debe ser valido').isMongoId(),
        validarCampos
    ],
    crearSistema);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del sistema es obligatorio').not().isEmpty(),
        check('equipo', 'El id del equipo debe ser valido').isMongoId(),
        check('componente', 'El id del comoponente debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarSistema);

router.delete('/:id', validarJWT, eliminarSistema);



module.exports = router;