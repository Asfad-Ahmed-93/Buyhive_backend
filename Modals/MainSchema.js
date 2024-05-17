const mongoose =require("mongoose");

const card =mongoose.Schema({
    Product_id:{
        type:String,
    },
    Image:{
        type:String,
    },
    Flag:{
        type:Boolean,
    },
   Discription:{
        type:String,
    },
    Stock:{
        type:Number,
        default:0
    },
    Price:{
        type:Number,
        default:0
    },
    Certification:{    
        type:String
    },
    Country:{
        type:String
    },
    Availability:{
        type:String
    },
    Supplier:{
        type:String
    }
})
const modal  =mongoose.model("Card",card);
module.exports = modal