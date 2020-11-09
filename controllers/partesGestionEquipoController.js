const { response } = require('express');
const Partes = require('../models/PartesGestionEquiposModel');

const getPartess = async(req, res = response) => {

    const partess = await Partes.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        partess
    });
}
const crearPartes = async(req, res = response) => {
    const uid = req.uid;

    const partes = new Partes({
        usuario: uid,
        ...req.body
    });

    try {

        const partesDB = await partes.save();
        res.json({
            ok: true,
            partes: partesDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPartes = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const partes = await Partes.findById(id);
        if (!partes) {
            return res.status(404).json({
                ok: true,
                msg: 'Partes no existe'

            });
        }

        const cambiosPartes = {
            ...req.body,
            usuario: uid
        }

        const partesActualizado = await Partes.findByIdAndUpdate(id, cambiosPartes, { new: true });

        return res.json({
            ok: true,
            partes: partesActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPartes = async(req, res = response) => {
    const id = req.params.id;

    try {

        const partes = await Partes.findById(id);
        if (!partes) {
            return res.status(404).json({
                ok: true,
                msg: 'Partes no existe'

            });
        }

        await Partes.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Partes Eliminado'

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
    getPartess,
    crearPartes,
    actualizarPartes,
    eliminarPartes
}