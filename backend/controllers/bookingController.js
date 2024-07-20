const{BookingDetails}=require('../model/Booking');

async function addBooking(req,res){
    try{
        const booking=await BookingDetails.create({
            "serviceId":req.body.serviceId,
            "userId":req.body.userId,
            "status":req.body.status,
            "bookingDate":req.body.bookingDate,
            "isBooked":req.body.isBooked,
        })
        res.status(200).json({
            "status":"success",
            "message":"Booking is requested"
        })
    }
    catch(error){
        req.status(500).json({
            "status":"failure",
            "message":"Couldn't able to book",
        })
    }
}

async function getBooking(req,res){
    try{
        const page=req.query.page;
        const bookPerpage=20;
        const bookingDetails=await BookingDetails.find().populate('serviceId').populate({ path: 'userId', select: '-password' }).skip(page * bookPerpage).limit(bookPerpage).sort({"bookingDate":-1});
        res.status(200).json(bookingDetails)
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't retrieve the bookings",
            "error":error
        })
    }
}

async function getOneUserBooking(req,res){
    try{
        const page=req.query.page;
        const bookPerpage=20;
        const bookingDetails=await BookingDetails.find({"userId":req.params.userId}).populate({path:'userId',select:'-password'}).skip(page * bookPerpage).limit(bookPerpage);
        res.status(200).json(bookingDetails);
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't get booking data",
        })
    }
}

async function deleteBooking(req,res){
    try{
        const booking=await BookingDetails.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            "status":"success",
            "message":"Booking is successfully deleted"
        })
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "meesage":"Internal server error",
            "error":error
        })
    }
}

async function statusUpdate(req,res){
    try{
        await BookingDetails.findByIdAndUpdate(req.params.id,{"status":req.query.status});
        res.status(200).json({
            "status":"success",
            "message":"Status is updated"
        });
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't update the status"
        })
    }
}

async function filterStatus(req,res){
    try{
        const page=req.query.page;
        const bookPerpage=20;
        const getBookingdata=await BookingDetails.find({"status":req.query.status}).skip(page * bookPerpage).limit(bookPerpage);
        res.status(200).json(getBookingdata);
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't fetch filter data",
            "error":error
        })
    }
}

async function filterUser(req,res){
    try{
        const page=req.query.page;
        const bookPerpage=20;
        const getBookingdata=await BookingDetails.find({"userId._id":req.params.userId,"status":req.query.status}).skip(page * bookPerpage).limit(bookPerpage);
        res.status(200).json(getBookingdata);
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't fetch data",
            "error":error
        })
    }
}

module.exports={addBooking,getBooking,getOneUserBooking,deleteBooking,statusUpdate,filterStatus,filterUser};