const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var carrSchema = {
  nombre : String,
  año : String,
  per_acd: String
};
var carrera= mongoose.model("carrera", carrSchema);
module.exports = carrera;
