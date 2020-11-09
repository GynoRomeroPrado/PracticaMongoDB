const { response } = require('express');
const Equipo = require('../models/equipoGestionEquipoModel');

const getEquipos = async(req, res = response) => {

    const equipos = await Equipo.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        equipos
    });
}
const crearEquipo = async(req, res = response) => {
    const uid = req.uid;

    const equipo = new Equipo({
        usuario: uid,
        ...req.body
    });

    try {

        const equipoDB = await equipo.save();
        res.json({
            ok: true,
            equipo: equipoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarEquipo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const equipo = await Equipo.findById(id);
        if (!equipo) {
            return res.status(404).json({
                ok: true,
                msg: 'Equipo no existe'

            });
        }

        const cambiosEquipo = {
            ...req.body,
            usuario: uid
        }

        const equipoActualizado = await Equipo.findByIdAndUpdate(id, cambiosEquipo, { new: true });

        return res.json({
            ok: true,
            equipo: equipoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarEquipo = async(req, res = response) => {
    const id = req.params.id;

    try {

        const equipo = await Equipo.findById(id);
        if (!equipo) {
            return res.status(404).json({
                ok: true,
                msg: 'Equipo no existe'

            });
        }

        await Equipo.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Equipo Eliminado'

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
    getEquipos,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo
}