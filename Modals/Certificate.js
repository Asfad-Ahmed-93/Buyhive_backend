const mongoose =require("mongoose");

const Certificate =mongoose.Schema({

    country:[String],
    product:[String],
    supplier:[String],
  
})

const certificate  =mongoose.model("certificate",Certificate);

module.exports = certificate 