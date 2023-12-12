const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
  category: {
    type: Array,
  },
  Type:{
    type:String
  },
  city: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  vhsname: {
    type: String,
    require: true,
  },
  smsname: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  experiance: {
    type: String,
    require: true,
  },
  languagesknow: {
    type: String,
    require: true,
  },
  walletBalance:{
    type:String
  }
}, {
  timestamps: true,
});

const technicianmodel = mongoose.model("technician", technicianSchema);
module.exports = technicianmodel;
