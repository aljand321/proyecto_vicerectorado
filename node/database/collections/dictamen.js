const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var dicSchema = new Schema({
  num : String,
  numres : String,
  lon : Number,
  vecinos: String,
  ciudad: String,
  contact: String
});
var dictamen = mongoose.model("dictamen", dicSchema);
module.exports = mapa;
