let mongoose = require("mongoose");

let schema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "category must be set"],
  },
  name: {
    type: String,
  },
  userID: {
    type: String,
  },

  budget: {
    type: Number,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

let model = mongoose.model("projectModel", schema);
module.exports = model;
