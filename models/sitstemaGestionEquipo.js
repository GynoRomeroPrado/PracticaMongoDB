const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const SistemaGestionEquipoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    fechaCreacion: {
        type: Date
    },
    fechaActualizacion: {
        type: Date
    },
    equipo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'EquipamientoGestionEquipo'
    },
    componente: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'ComponenteGestionEquipo'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'sistemaGestionEquipos' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb
// sino asignamos un nombre mongodb creara la coleccion asignandole una s al final

SistemaGestionEquipoSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('SistemaGestionEquipo', SistemaGestionEquipoSchema);