const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emerg = new Schema({
  userId: {
    required: true,
    type: String,
  },
  Name: {
    required: true,
    type: String,
  },
  Descrption: {
    required: true,
    type: String,
  },
  Flocation: {
    required: true,
    type: String,
  },
  State: {
    required: true,
    type: String,
  },
  Level: {
    required: true,
    type: Number,
  },
  Date: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Emergency", emerg);
