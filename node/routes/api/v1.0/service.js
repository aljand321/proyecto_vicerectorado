var express = require('express');

var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
var fs = require('fs');
var User = require("../../../database/collections/user");
var Inmuebles = require("../../../database/collections/inmuebles");
var Img = require("../../../database/collections/img");
var Mapa = require("../../../database/collections/mapa");
//(img = pdf; user =resoluciones; inmuebles=cartas[docentes, estudiantes])

var Resolucion = require("../../../database/collections/resolucion");
var Docentes = require("../../../database/collections/docente");
var Estudiantes = require("../../../database/collections/estudiante");
var Pdf = require("../../../database/collections/pdf");
var Carrera = require("../../../database/collections/carrera");
//Prueba


//var jwt = require("jsonwebtoken");



var storaged = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null ,'./public/pdf')//aqui se define el lugar donde se almacena la imagen
  },
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" +  Date.now() );
  }
});
var uploadoc = multer({storage : storaged}).single('doc');//este es el key con la cual se ingresara la imagen


//Un pequeño help us
//funcion que permite controlar con Regex que el id cumpla con el formato ObjectId de mongo
router.param(function(param,validator){
  return function(req,res,next,val){
    //hacemos la validacion con  .test() propio de regex y comparamos
    if (validator.test(val) == true) {
      next();
    }else{
      //si no cumple devolvemos la respuesta de error
      res.status(400).json({error : "El id " + val + " , No cumple con el formato requerido"});
    }
  }
});



//router.param('id',/^[a-z0-9]{24}$/);


//añadiendo a usario

router.post("/user", (req, res) => {

  var user = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    email : req.body.email,
    numeroTelefono : req.body.numeroTelefono,
    ciudad : req.body.ciudad,
    direccionActual : req.body.direccionActual,
    password : req.body.password
  };
 User.findOne({email : req.body.email}).exec( (error, docs) => {
   if(docs != null){
     res.status(200).json({
       "msn" : "el email ya esta en uso"
     });
   }
   else{
     if(error){
       res.status(401).json({
         "msn" : "servicio a fallado"
       });
     }
     else{
       var userData = new User(user);
       userData.save().then( () => {
           res.status(200).json({
             "msn" : "Registrado con exito"
           });
       });
     }
   }
 });
});

//
router.post("/raicing", (req, res)=>{
  var carrera = {
    nombre : req.body.name,
    año : req.body.date,
    per_acd: req.body.ac
  };
/*Carrera.findOne({nombre : req.body.name}).exec( (error, docs) => {

})*/
      var Data = new Carrera(carrera);
      Data.save().then( () =>{
        res.status(200).json({
          "msn" : "exito"
        });
      });
});

//ingresar cartas
router.post("/resl", (req, res) => {
  var c = "sistemas";//necesito esta informacion de la carrera
  var date = "2018";
  var periodo = "gestion";
  var resl = {
    nr : req.body.nr,
    nd : req.body.nd
  };
Carrera.findOne({nombre : c}).exec( (error, docs) => {
   if(error){
     res.status(200).json({
       "msn" : error
     })
     return
  }
     if(docs != null){
       var id = docs.nombre;
       var name = docs.id_;
       resl.id_carrera = name;
       resl.carrera = id;
       var resData = new Resolucion(resl);
       resData.save().then( () => {
           res.status(200).json({
             "msn" : "Registrado con exito"
           })
       }).catch((err) => {
         res.status(400).json({
           "msn" : err
         })
       });
   }
   else{
      res.status(200).json({
        "msn" : "la carrera no esta Registrado"
      })
    }

 });
});
//en la url se envia con la id del inmueble registrado
//en key se pone doc
///ingresar el documentos
router.post("/documentos", (req, res) => {
  //
  //var url = req.url;
  var c= "sistemas"; //necesito esta informacion
  uploadoc(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir el documento"
      });
    } else {

      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var pdf = {
        id_c: c,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var pdfData = new Pdf(pdf);
      pdfData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          archivo: new Array()
        }
        var foto = "http://localhost:7777" + ruta;
        console.log("ruta del documento"+" " +foto +" "+ "documentos  ruta");
      Resolucion.findOne({carrera:c}).exec( (err, docs) =>{
          //console.log(docs);
          var data = docs.archivo;
          var aux = new  Array();
          if (data.length == 1 && data[0] == "") {
            //aqui se pone la ip de la maquina donde esta corriendo , es decir nuestra ip
            home.archivo.push("/api/v1.0/documentos/" + infoimg._id);
          }
         else {
            // aqui tambien nuestra ip
            aux.push("/api/v1.0/documentos/" + infoimg._id);
            data = data.concat(aux);
            home.archivo = data;

          }
         Resolucion.findOneAndUpdate({carrera : c}, home, (err, params) => {
              if (err) {
                res.status(500).json({
                  "msn" : "error en la actualizacion de la imagen"
                });
                return;
              }
              res.status(200).json(
                req.file
              );
              return;
          });
        });
     });
    }
  });
});

//poligonos para los remapearlos
module.exports = router;
