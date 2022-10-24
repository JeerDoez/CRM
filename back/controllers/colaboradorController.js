var Colaborador = require('../models/Colaborador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_colaborador_admin = async function(req,res){
    let data = req.body;//variable que guarda todos los valores del formulario
    try {

        var colaboradores = await Colaborador.find({email:data.email});//devuelve un arreglo de objaetos que pertenencen 
        //a un mismo correos si es 0 se puede registrar
        bcrypt.hash('doce12',null,null,async function(err,hash){
           if (err) {
            res.status(200).send({data:undefined, message: "No se pudo generar la contraseña"});  //enviar al front como respuestra el objeto registradoque esta guardado en colaborador,
           }else{
                if (colaboradores.length>=1) {
                    res.status(200).send({data:undefined, message: "Ya existe una cuenta asociada al correo"});
                } else {
                    data.fullnames = data.nombres + ' ' + data.apellidos;
                    data.password = hash;
                    let colaborador = await Colaborador.create(data); //objeto colaborador, que es la instancia del modelo
                    res.status(200).send({data:colaborador});  //enviar al front como respuestra el objeto registradoque esta guardado en colaborador,
                }
           }
        });
     
    } catch (error) {
        res.status(200).send({data:undefined, message: "Verifique los campos del formulario."});  //enviar al front como respuestra el objeto registradoque esta guardado en colaborador,
    }
}

const login_admin = async function(req,res) {
    console.log("--");
    let data = req.body;
    console.log(req);
    var colaboradores = await Colaborador.find({email:data.email});
   // console.log(Colaborador);
    if (colaboradores.length >=1 ) {
        //si hay cuenta
        bcrypt.compare(data.password,colaboradores[0].password, async function(err,check){
            if (check) {
                res.status(200).send({
                    data: colaboradores[0],
                    token: jwt.createToken(colaboradores[0])
                });
            } else {
                res.status(200).send({data:undefined, message: "La contraseña es incorrecta"}); 
                
            }
        });
    } else {
        res.status(200).send({data:undefined, message: "No hay, no existe el correo"}); 
    }

    console.log(data);
}  //metodo del login

module.exports = {
    registro_colaborador_admin,
    login_admin
}