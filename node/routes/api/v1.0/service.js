var express = require('express');

var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
var fs = require('fs');
var User = require("../../../database/collections/user");
var Inmuebles = require("../../../database/collections/inmuebles");
var Prueba = require("../../../database/collections/prueba");
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

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null ,'./public/avatars')//aqui se define el lugar donde se almacena la imagen
  },
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" +  Date.now() + ".jpg");
  }
});
var upload = multer({storage : storage}).single('img');//este es el key con la cual se ingresara la imagen

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
var uploadoc = multer({storage : storaged}).single('doc');
//Prueba*/

/*router.post("/prueba", (req, res) => {
<<<<<<< HEAD
=======
var Mapa = require("../../../database/collections/mapa");

//Prueba

router.post("/prueba", (req, res) => {
>>>>>>> 3213fc8086a4c832fb31a8c9e18e779913a0bb18
=======
>>>>>>> aa6ddf82e2b4b9b510e9667a0f8ef3cf3533c008
>>>>>>> b9614c55957c4140519dfde72a3dc9db0d9c5cb0

  var prueba = {
    Title : req.body.Title,
    Year : req.body.Year,
    imdbID : req.body.imdbID,
    Type : req.body.Type,
    Poster : req.body.Poster
  };
  var pruebaData = new Prueba(prueba);

  pruebaData.save().then( () => {
      res.status(200).json({
        "msn" : "Registrado con exito"
      });
  });

<<<<<<< HEAD
<<<<<<< HEAD
});*/


//ruta para listar los libros mas la informacion completaa del autor
router.get("/prueba", (req, res, next) => {
  //aqui utilizamos populate() para poblar el parametro "autor" con toda la info acerca del mismo
  Prueba.find({}).populate("user").exec( (error, docs) => {
    //checkeamos hay error de algun tipo
    if (error) {
      //devolvemos el error;
      res.status(400).json({error : error});return;
    }else{
      res.status(200).json({

          //Podriamos devolver los documentos tal cual los recibimos;
          //pero tb podemos remapearlos (si vale el termino) segun nuestros requerimientos
          //Por ej. : usamos la funcion map() de javascript ;

        Prueba : docs.map(doc => {
          return {
            //aqui reesctructuramos cada documento
            detalle : {

              Title : doc.Title,
              Year : doc.Year,
              imdbID : doc.imdbID,
              Type : doc.Type,
              Poster : doc.Poster
            },

            //Aqui tambien podemos devolver algun tipo de mensaje u otro que veamos conveniente

          }
        })
      });
    }
  })
});


//mostrar usuarios

/*
>>>>>>> 3213fc8086a4c832fb31a8c9e18e779913a0bb18
=======

/*
=======
//mostrar usuarios


>>>>>>> 4872d41fca11dbed117e45ee5a8bb1ac2eb25f1e
>>>>>>> b9614c55957c4140519dfde72a3dc9db0d9c5cb0
router.get("/prueba", (req, res, next) =>{
  Prueba.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});*/



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
  var periodo = "gestio";
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


//mostrar usuarios


//en la url se envia con la id del inmueble registrado
//en key se pone img
router.post(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        idhome: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          gallery: new Array(),
          imagen : new Array(),
          picture : new Array()
        }

        var foto = "http://localhost:7777" + ruta;

        console.log("ruta de la img"+" " +foto +" "+ "imagen llll ruta");

        Inmuebles.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);

          var data = docs.gallery;
          var ph = docs.imagen;
          var data_img = docs.picture;
          var aux = new  Array();
          var phaux = new Array();
          var daa_aux = new Array();
          if (data.length == 1 && data[0] == "") {
            //aqui se pone la ip de la maquina donde esta corriendo , es decir nuestra ip
            home.gallery.push("/api/v1.0/homeimg/" + infoimg._id);
            home.imagen.push("http://localhost:7777" + ruta );
            home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
            //photo.imagen.push(picture);

          }
          //console.log("picture" +" "+ data_img[0]);
        /*  if(data_img.length == 0 && data_img[0] == "null"){
            home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
          }*/

          else {
            // aqui tambien nuestra ip
            aux.push("/api/v1.0/homeimg/" + infoimg._id);
            phaux.push("http://localhost:7777" + ruta);
            daa_aux.push("/api/v1.0/homeimg/" + infoimg._id);
            //phaux.push(picture);
            data = data.concat(aux);
            ph = ph.concat(phaux);
            data_img = data.concat(daa_aux);
            home.gallery = data;
            home.imagen = ph;
          }
          Inmuebles.findOneAndUpdate({_id : id}, home, (err, params) => {
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
///ingresar el documentos
/*router.post("/documentos", (req, res) => {
  //
  //var url = req.url;
  uploadoc(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir el documento"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var pdf = {
        //iddoc: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var pdfData = new Pdf(pdf);
      pdfData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          gallery: new Array(),
          //imagen : new Array(),
          //picture : new Array()
        }
        var foto = "http://localhost:7777" + ruta;

        console.log("ruta del documento"+" " +foto +" "+ "documentos llll ruta");


      Resolucion.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);

          //var data = docs.gallery;
          //var ph = docs.imagen;
          //var data_img = docs.picture;
          var aux = new  Array();
          //var phaux = new Array();
          //var daa_aux = new Array();
          if (data.length == 1 && data[0] == "") {
            //aqui se pone la ip de la maquina donde esta corriendo , es decir nuestra ip
          //  home.gallery.push("/api/v1.0/homeimg/" + infoimg._id);
              home.gallery.push("/api/v1.0/documentos/" + infoimg);
            //home.imagen.push("http://localhost:7777" + ruta );
          //  home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
            //photo.imagen.push(picture);
            res.status(500).json({
              "msn" : "error en la actualizacion de la imagen"
            });

            return;

          }
          //console.log("picture" +" "+ data_img[0]);
        /*  if(data_img.length == 0 && data_img[0] == "null"){
            home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
          }*/

        /* else {
            // aqui tambien nuestra ip
            aux.push("/api/v1.0/documentos/" + infoimg._id);
            //phaux.push("http://localhost:7777" + ruta);
            //daa_aux.push("/api/v1.0/documentos/" + infoimg._id);
            //phaux.push(picture);
            data = data.concat(aux);
            //ph = ph.concat(phaux);
            data_img = data.concat(daa_aux);
            home.gallery = data;
            //home.imagen = ph;
            res.status(200).json({"msn" :"bien"});
            return;

          }
          res.status(500).json({
            "msn" : "error en la actualizacion de la imagen"
          });
          return;*/
        /*  Inmuebles.findOneAndUpdate({_id : id}, home, (err, params) => {
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
          });*/

        //});
    //  });
    //}
  //});
//});
//obtener la imagen
//en la url se envia con la id de la foto o imagen registrada
router.get(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Img.findOne({_id: id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
      return;
    }
    else{
      if(docs){
        //regresamos la imagen deseada
        var img = fs.readFileSync("./" + docs.physicalpath);
        //var img = fs.readFileSync("./public/avatars/img.jpg");
        res.contentType('image/jpeg');
        res.status(200).send(img);
        //regresamos la imagen deseada
      }
      else{
        res.status(424).json({
          "msn": "La solicitud falló, ,la imagen fue eliminada"
        });
        return;
      }
    }

  });
});

router.delete(/img\/[a-z0-9]{1,}$/, (req, res) => {
 var url = req.url;
 var id = url.split("/")[2];
Img.find({_id : id}).remove().exec( (err, docs) => {
     res.status(200).json(docs);
 });
});

//FIltrado
router.get("/inmuebles_f", (req, res, next) => {
  //query params
  var params = req.query;

  var precio = params.precio;
  console.log(precio);
  var over = params.over;
  console.log(over);

  if(precio == undefined && over == undefined){
    Inmuebles.find({lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
      res.status(200).json({
        info: docs
      });
    })
    return;
  }
 if(over == "equals"){
   //min<precio&max<precio
   console.log("---------->")
   Inmuebles.find({precio : precio, lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
      info:  docs
     });
   })
   return;
 }
 else if (over == "true"){
   Inmuebles.find({precio: {$gt:precio}, lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
       info: docs
     });
   })
 }

});

//filtro simplificado
router.get('/filtro_precio', (req, res, next) =>{
  var params = req.query;
  var max = params.max;
  var min = params.min ;
  console.log("msn"+max);
  console.log("msnmin"+min);

//db.inventario.find( {$and: [  {qty :{  $gt :  25  }} , {qty : { $lt : 85 }} ] } )
//db.inventario.find( {qty : {$gt: 25, $lt: 85} } )
  Inmuebles.find( {$and: [ {precio : {$lt : max}} , {precio : {$gt : min}} ] }  ).exec((err, docs) => {
    if(docs){
          res.status(200).json({
            info: docs
          });
    }
    else{
      res.status(201).json({
        "msn" : "no existe inmuebles con ese precio "
      });
    }
    /*res.status(200).json({
      info: docs
    });*/
  })
});

router.get('/filtro_tipo', (req ,res,next) =>{
  var params = req.query;
  var tipo = params.tipo;
  var estado = params.estado;
  console.log("tipo"+tipo);

  Inmuebles.find( {$or: [ {tipo : tipo},{estado : estado} ] } ).exec((err, docs) => {
    if(docs){
          res.status(200).json({
            info: docs
          });
    }
    else{
      res.status(201).json({
        "msn" : "no existe inmuebles con ese precio "
      });
    }
  })
});

router.get('/filtro_cant', (req, res, next) => {
  //?wuc=2&curto=6
  var params = req.query;
  var wuc = params.wuc;
  var cuarto = params.cuarto;
  console.log("-->"+wuc);
  Inmuebles.find( {$or : [ {cantidadCuartos: cuarto }, {cantidadBaños : wuc }] }).exec((err, docs) =>{
    if(docs){
          res.status(200).json({
            info: docs
          });
    }
    else{
      res.status(201).json({
        "msn" : "no existe inmuebles con ese precio "
      });
    }
  })
});
//filtro.todo en uno con nulls

router.get('/filtro_all',(req, res, next) =>{
  var params= req.query;
  //  var tipo = params.tipo;
  //var estado = params.estado;
  var max = params.max;
  var min = params.min;
  var wuc = params.wuc;
  var cuarto = params.cuarto;
  //console.log("tipo"+tipo);
  //db.inmuebles.find({$and :[{$or :[{precio :12000}, {precio:14000}]},{$or :[{cantidadBaños:4},{cantidadCuartos: 12}]}]});

  Inmuebles.find( { $and: [ {precio : {$lt : max}} , {precio : {$gt : min}} ]} ).exec( (err, docs) =>{
    if(docs){
      res.status(200).json({
        info: docs
      });

    }
    else{
      res.status(201).json({
        "msn" : "no existe inmuebles con ese precio "
      });

    }
  })
  Inmuebles.find( {$and : [ {cantidadCuartos: cuarto }, {cantidadBaños : wuc }] }).exec((err, docs) =>{
    if(docs){
          res.status(200).json({
            info: docs
          });
    }
    else{
      res.status(201).json({
        "msn" : "no existe inmuebles con ese precio "
      });
    }
  })

});



//mapas
router.post("/mapa", (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var mapa = {
    calle : req.body.street,
    descripcion : req.body.descripcion,
    precio : req.body.price,
    lat : req.body.lat,
    lon : req.body.lon,
    vecinos : req.body.neighborhood,
    ciudad : req.body.city,
    galeria: "",
    contact: req.body.contact
  };
  var mapaData = new Mapa(mapa);

  mapaData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "usuario Registrado con exito "
    });
  });
});

//db.inventario.find({},{"item":1, "_id":0,"estado":1})
//muestra la longitud y latitud de todos los inmuebles
router.get("/ubicacion",(req, res) => {
  Inmuebles.find({},{"lon":1,"lat":1}).exec((err, docs)=>{

      res.status(200).json(docs);
  })
});
//muestra la longitud y la latitud de un determinado inmueble
router.get(/direccion\/[a-z0-9]{1,}$/,(req, res)=>{
  var url = req.url;
  var id = url.split("/")[2];
  Inmuebles.find({$and :[ {"_id" : id},{"lon":$}]}).exec((err, docs)=>{
    res.status(200).json({
      docs
   });
   return;
   console.log(Inmuebles.lat);
 });
});

//FIltrado
//mostrar inmuebles por usuario
// \{4,4}
router.get('/usergmail', (req, res) => {
  var url = req.query;
  var mail = url.email;
  console.log(mail);

  User.find({email: mail}).exec((er, docs) =>{
    if(er){
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
    }
    else{
      if(docs != null){
        res.status(200).json({"msn" : "exite user"});
      }
      else{
        res.status(500).json({
          "msn": "el usuaio no existe"
        });
      }
    }
  })
});
//poligonos para los remapearlos
module.exports = router;
