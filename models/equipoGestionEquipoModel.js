const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const EquipamientoGestionEquipoSchema = Schema({
    codigo: {
        type: String,
        required: true
    },
    nombre: {
        type: String
    },
    tipo: {
        type: String
    },
    localidad: {
        type: String
    },
    status: {
        type: String
    },
    fechaCreacion: {
        type: Date
    },
    fechaActualizacion: {
        type: Date
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'equipamientoGestionEquipos' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb
// sino asignamos un nombre mongodb creara la coleccion asignandole una s al final


EquipamientoGestionEquipoSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('EquipamientoGestionEquipo', EquipamientoGestionEquipoSchema);