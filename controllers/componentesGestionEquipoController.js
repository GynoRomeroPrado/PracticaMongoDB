const { response } = require('express');
const Componente = require('../models/comopenteGestionEquipoModel');

const getComponentees = async(req, res = response) => {
    const componentes = await Componente.find().
    populate('usuario', 'nombre img').
    populate('partes', 'nombre');

    res.json({
        ok: true,
        componentes
    });
}
const crearComponente = async(req, res = response) => {
    const uid = req.uid;

    const componente = new Componente({
        usuario: uid,
        ...req.body
    });

    try {

        const componenteDB = await componente.save();
        res.json({
            ok: true,
            componente: componenteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarComponente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const componente = await Componente.findById(id);
        if (!componente) {
            return res.status(404).json({
                ok: true,
                msg: 'Componente no existe'

            });
        }

        const cambiosComponente = {
            ...req.body,
            usuario: uid
        }

        const componenteActualizado = await Componente.findByIdAndUpdate(id, cambiosComponente, { new: true });

        return res.json({
            ok: true,
            componente: componenteActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarComponente = async(req, res = response) => {
    const id = req.params.id;

    try {

        const componente = await Componente.findById(id);
        if (!componente) {
            return res.status(404).json({
                ok: true,
                msg: 'Componente no existe'

            });
        }

        await Componente.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Componente Eliminado'

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
    getComponentees,
    crearComponente,
    actualizarComponente,
    eliminarComponente
}