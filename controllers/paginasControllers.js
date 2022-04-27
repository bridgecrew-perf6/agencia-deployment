import { Viajes } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";


const paginaInicio = async (req, res) => { //req => lo que enviamos, res => lo que express nos responde
    
    //consulta 3 viajes del modelo de viaje para mostrarlos en la pagina de inicio

    const promiseDB = [];

    promiseDB.push(Viajes.findAll({limit: 3})); //con el limit , le decimos que solo nos traiga tres valores 
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
        
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            clase: 'home', // esta es un variable con el nombre de una clase para darle estilos a la pagina de inicio y se vea diferente a 
                            //las demas
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    } 
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => { 

    const viajes = await Viajes.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes 
    });
};

//va a mostrar un viaje ppr su slug
const paginaDetallesViajes = async (req, res)=> {

    // const slug = req.params.slug // esta manera o un distruction como sigue adelante
    const { slug } = req.params

    //console.log(slug)// esto me va a traer el nombre del parametro al cual le damos click en mas informacion

    try {

        const viaje = await Viajes.findOne({where: {slug}})

        res.render('viaje', {
            pagina: 'Informacion del Viaje',
            viaje // este va hacer el arrelgo del viaje al cual estamos accediendo
            
        });
        
    } catch (error) {
        console.log(error)
        
    }
}

const paginaTestimoniales = async (req, res) => { 

    try {

        //extrayendo de la base de datos los testimoniales para luego mostralos
        const testimoniales = await Testimonial.findAll()


        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error)
    }


    // res.render('testimoniales', {
    //     pagina: 'Testimoniales'
    // });
};



export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetallesViajes
}