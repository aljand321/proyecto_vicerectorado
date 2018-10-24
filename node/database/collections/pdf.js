const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var pdfSchema = {
  name : String,
  idhome: String,
  physicalpath : String,
  relativepath : String
};
var pdf = mongoose.model("pdf", pdfSchema);
module.exports = pdf;
