//const express = require('express');// commonjs. es una sintaxis q se le conoce como ese nombre
                                    // ahora salio los modules y import para java script y ya los soporta express
import express from 'express';// version de import nueva , pero al usar esta version , se tieen que configuara en el 
                                //package.json, colocando despues de los script : "type": "module"
import router from './routes/index.js';        
import db from './config/db.js';                        

const app = express(); // digamos que express() contiene una funcion para ejctuar express 
                        // que se la estamos asignando a la variable app
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});//aqui va a bucar las variables

//conectar la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//definir puerto, esto lo hacemos al principio del proyecto, luego lo volvemos a modificar a lo ultimo para el deployment
//const port = process.env.PORT || 4000; // esta es una variable de entorno (process.env.PORT), esta variabel se asigna automaticamente cuando se haga el deploymente
                                    //por los momentos no existe,  asi que como no la tenemos ahorita caera la ejecucion en la varibale port que es igual al 4000

//habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual y le pasamos esa variable a la vista de footer paera mostrar el año
app.use((req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();// la variable que pasemos se llama actualYear

    res.locals.nombreSitio = 'Agencia de Viajes'


    next() // para que se vaya a la siguiente linea (middleware)
});

//agregar body parse para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta PUBLIC donde estan las imagenes y css y mas , de esta manera express tiene acceso a estos archivos
app.use(express.static('public'));


//agregando el router a la app. //use() , incluye todos los verbos ( get, put, post, delete)
app.use('/', router)                                    ;


// PUERTO Y HOST PARA LA APP
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`)
});
//NOTA: heroku va asignar tanto el host como el port una vez que se haga el deployment, es decir cuando 
    // estemos en prodcucion herokus va asignar el port y el host

