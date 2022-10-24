var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.port || 4201;

var app = express();

var tetst_routes = require('./routes/test');
var colaborador_routes = require('./routes/colaborador');

mongoose.connect('mongodb://127.0.0.1:27017/negocio',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Servidor Corriendo......... All rigth!!")
        app.listen(port,function(){ 
            console.log("El puerto es: " + port);
        });
    }
});

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

//EL back recibedatos de un servidor externo
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',tetst_routes);
app.use('/api',colaborador_routes);//////

module.exports = app;