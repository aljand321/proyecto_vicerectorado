const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var resSchema = {
  nr: String,
  nd : String,
  carrera: String,
  archivo: Array,
  id_carrera: {type: Schema.ObjectId, ref: "carrera"}
};
var resolucion= mongoose.model("resolucion", resSchema);
module.exports = resolucion;
