const mongoose = require("mongoose");

const enquiryaddSchema = new mongoose.Schema(
  {
    // enquiryaddSchema is a MongoDB document
    EnquiryId: {
      //collections
      type: Number,
      default: 0,
    },
    enquirydate: {
      // collections
      type: String,
    },
    time: {
      type: String,
    },
    executive: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    contact1: {
      type: String,
      require: true,
    },
    contact2: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    reference1: {
      type: String,
    },
    reference2: {
      type: String,
    },
    reference3: {
      type: String,
    },
    comment: {
      type: String,
      require: true,
    },
    intrestedfor: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
    },
    folldate: {
      type: String,
    },
    staffname: {
      type: String,
    },
    response: {
      type: String,
    },
    desc: {
      type: String,
    },
    enquirydate: {
      type: String,
    },
    enquiryfollowupdate: {
      type: String,
    },
    value: {
      type: String,
    },
    colorcode: {
      type: String,
    },
    nxtfoll: {
      type: String,
    },
    counter: {
      type: String,
    },
    enquirydetails: {
      type: Array,
    },
    technicianname: {
      type: String,
    },
    reasonForCancel: {
      type: String,
    },
    cancelStatus: {
      type: Boolean,
      default: false,
    },
    quotefollup: {
      type: Array,
    },
    projecttype: {
      type: String,
    },
    qamt: {
      type: String,
    },
    bookedby: {
      type: String,
    },
    appoDate: {
      type: String,
    },
    appoTime: {
      type: String,
    },
    staffName: {
      type: String,
    },
    responseType: {
      type: String,
    },
    deliveryAddress: {
      type: Object,
    },

    // 05-10
    serviceID: {
      type: String,
    },
    creatAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const enquiryaddmodel = mongoose.model("enquiryadd", enquiryaddSchema);
module.exports = enquiryaddmodel;
