import { Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    // console.log(req.body)//req.body , va a leer los datos que el cliente escribio en el formulario, el name que tiene cada input
    
    //validar campos
    const {nombre, correo, mensaje} = req.body;

    const errores = []

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El Nombre esta vacio'})
    };

    if(correo.trim() === '') {
        errores.push({mensaje : 'El correo esta vacio'})
    };

    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'})
    };
    
    // console.log(errores)

    if(errores.length > 0) {

        //extrayendo de la base de datos los testimoniales para luego mostralos
        const testimoniales = await Testimonial.findAll()

        //mostrar la vista con errores, ya Tambien los testimoniales
         res.render('testimoniales', {

            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales

        });
    } else {
        //almacenar los datos en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales'); //una vez que los datos se envien , redireccionamos a la pagina de testimoniales
            
        } catch (error) {
            console.log(error)
            
        }

    }
};

export {
    guardarTestimonial
} 
