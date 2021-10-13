let mongoose = require("mongoose");

let schema = mongoose.Schema({
  name: {
    type: String,
  },
  userID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: [true, "The price must be set"],
  },
  projectId: {
    type: String,
  },
});

let model = mongoose.model("invoiceModel", schema);
module.exports = model;
