import express from 'express';
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetallesViajes} from '../controllers/paginasControllers.js';

import { guardarTestimonial } from '../controllers/testimonialController.js'


const router = express.Router(); // exportanto express a este archivo como router, donde aqui agregamos
                                //todas las vistas o url por medio de un get


router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros)

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetallesViajes); //usando un comodin para ver los viaje spor separado al darle click en el boton de informacion

router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

export default router;






