const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var carestSchema = {
  tipo : String,
  num_d : String,
  num_r : String,
  resol: {type: Schema.ObjectId, ref: "resolucion"}
};
var estudiante = mongoose.model("estudiante", carestSchema);
module.exports = estudiante;
