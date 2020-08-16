const path = require("path");
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//connecting to db
mongoose.connect('mongodb://localhost/crud-mongo').then(db => {
    console.log('Db connected');
})
    .catch(error => {
        console.log(error);
    });

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
//-----Motor de plantillas
app.set('view engine', 'ejs');
//----Morgan: es un middleware
//middlewares: se ejecutan antes de las rutas
app.use(morgan('dev'));
//Entender los datos que se le envia dentro de un formulario: false por que no va enviar imagnes di archivos grandes tan solo es texto
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', indexRoutes);


// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});

// var listener = app.listen(4000, () => {
//     console.log('Server on port: ', listener.address().port);
// });
