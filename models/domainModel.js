let mongoose = require("mongoose");

let schema = mongoose.Schema({
  url: {
    type: String,
  },
  userID: {
    type: String,
  },

  package: {
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
  paymentMethod: {
    type: String,
  },
});

let model = mongoose.model("domainModel", schema);
module.exports = model;
