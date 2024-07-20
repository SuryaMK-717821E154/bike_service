const mongoose=require('mongoose');

const serviceSchema= new mongoose.Schema({
    servicename:{
        type:String,
        required:true,
        trim:true
    },
    servicedesc:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    }
},{versionKey:false});

const ServiceDetails=mongoose.model('Service',serviceSchema);

module.exports={ServiceDetails};
