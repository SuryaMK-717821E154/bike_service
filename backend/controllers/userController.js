const {UserDetails}=require('../model/User');

async function getAlluser(req,res){
    try{
        const page=req.query.page;
        const userPerPage=10 
        const userDetails=await UserDetails.find({},{"password":0}).skip(page * userPerPage).limit(userPerPage);
        res.status(200).json(userDetails);
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't fetch User details",
            "error":error
        })
    }
}

async function getOneUser(req,res){
    try{
        const user=await UserDetails.findOne({"_id":req.params.userId},{"password":0});
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "meesage":"Couldn't fetch user",
            "error":error
        })
    }
}

async function deleteUser(req,res){
    try{
        await UserDetails.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            "status":"success",
            "message":"User is deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message":"Couldn't delete user",
        })
    }
}
module.exports={getAlluser,getOneUser,deleteUser};