
const prueba_test= async function(req,res){
   res.status(200).send({message: 'Hola, ya funciona el TEST'});
    //console.log("Ya funciona el test");
}

module.exports = {
    prueba_test
}