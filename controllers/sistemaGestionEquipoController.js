const { response } = require('express');
const Sistema = require('../models/sitstemaGestionEquipo');

const getSistemaes = async(req, res = response) => {
    const sistemaes = await Sistema.find().
    populate('usuario', 'nombre img').
    populate('equipo', 'nombre').
    populate('componente', 'nombre');

    res.json({
        ok: true,
        sistemaes
    });
}
const crearSistema = async(req, res = response) => {
    const uid = req.uid;

    const sistema = new Sistema({
        usuario: uid,
        ...req.body
    });

    try {

        const sistemaDB = await sistema.save();
        res.json({
            ok: true,
            sistema: sistemaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarSistema = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const sistema = await Sistema.findById(id);
        if (!sistema) {
            return res.status(404).json({
                ok: true,
                msg: 'Sistema no existe'

            });
        }

        const cambiosSistema = {
            ...req.body,
            usuario: uid
        }

        const sistemaActualizado = await Sistema.findByIdAndUpdate(id, cambiosSistema, { new: true });

        return res.json({
            ok: true,
            sistema: sistemaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarSistema = async(req, res = response) => {
    const id = req.params.id;

    try {

        const sistema = await Sistema.findById(id);
        if (!sistema) {
            return res.status(404).json({
                ok: true,
                msg: 'Sistema no existe'

            });
        }

        await Sistema.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Sistema Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getSistemaes,
    crearSistema,
    actualizarSistema,
    eliminarSistema
}