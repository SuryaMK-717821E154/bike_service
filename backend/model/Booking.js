const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    bookingDate:{
        type:String,
        default:Date.now
    },
    isBooked:{
        type:Boolean,
        default:false
    }
},{versionKey:false});

const BookingDetails=mongoose.model('Booking',bookingSchema);

module.exports={BookingDetails};