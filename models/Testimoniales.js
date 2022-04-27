import Sequelize from "sequelize";
import db from "../config/db.js";

//aqui estamos definiendo la tabla de la base de datos con sus campos, depues de define , la palabre viajes, es el nombre de la tabla de la base de datos
export const Testimonial= db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }

});