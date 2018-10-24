const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var cardocSchema = {
  num_re : String,
  num_di : String,
  resol: {type: Schema.ObjectId, ref: "resolucion"}
};
var docente = mongoose.model("docente", cardocSchema);
module.exports = docente;
