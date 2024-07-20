const {ServiceDetails}=require('../model/Service');

async function addService(req,res){
    try{
        const service=await ServiceDetails.create({
            "servicename":req.body.servicename,
            "servicedesc":req.body.servicedesc,
            "price":req.body.price
        });
        res.status(201).json({
            "status":"Success",
            "message":"Service is added"
        })
    }
    catch(error){
        req.status(500).json({
            "status":"failure",
            "message":"Internal server error",
            "error":error
        });
    }
}

async function getService(req,res){
    try{
        const page=req.query.page-1 || 0;
        const servicePerPage=10;
        const servicedetails=await ServiceDetails.find({}).skip(page * servicePerPage).limit(servicePerPage);
        res.status(200).json(servicedetails);
    }
    catch(error){
        req.status(500).json({
            "status":"failure",
            "message":"Couldn't fetch data",
            "error":error
        })
    }
}

async function updateService(req,res){
    try{
        await ServiceDetails.findByIdAndUpdate(req.params.id,{
            "servicedesc":req.body.servicedesc,
            "price":req.body.price
        });
        res.status(200).json({
            "status":"success",
            "message":"Service is updated successfully"
        })
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't update the data",
            "error":error
        })
    }
}

async function deleteService(req,res){
    try{
        await ServiceDetails.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status":"success",
            "message":"Service is successfully deleted"
        })
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Internal server error",
            "error":error
        })
    }
}

module.exports={addService,deleteService,updateService,getService};