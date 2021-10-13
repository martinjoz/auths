let mongoose = require("mongoose");

let schema = mongoose.Schema({
  receiver: {
    type: String,
    required: [true, "Receiver Email must be set"],
  },

  sender: {
    type: String,
    required: [true, "Sender Email must be set"],
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

let model = mongoose.model("mailModel", schema);
module.exports = model;
