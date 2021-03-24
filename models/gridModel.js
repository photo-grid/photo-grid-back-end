const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let GridSchema = new Schema({
  _id: String,
  items: [],
});

let GridModel = mongoose.model("GridModel", GridSchema);
module.exports = GridModel;
