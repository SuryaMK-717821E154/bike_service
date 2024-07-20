const{UserDetails}=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
async function register(req,res){
    try{
        const user=await UserDetails.find({"email":req.body.email});
        const salt=bcrypt.genSaltSync(10);
        const hashpassword=bcrypt.hashSync(req.body.password,salt);
        if(user.length===0){
            const user=await UserDetails.create({
                "username":req.body.username,
                "email":req.body.email,
                "password":hashpassword,
                "phone":req.body.phone,
                "usertype":req.body.usertype
            });
            const userDetails={
                username:user.username,
                email:user.email,
                phone:user.phone,
                usertype:user.usertype
            }
            res.status(201).json({
                "status":"success",
                "message":"User is created",
                "userdetails":userDetails
            })
        }
        else{
            res.status(400).json({
                "status":"failure",
                "message":"User already exist"
            })
        }
    }
    catch(err){
        res.status(500).json({
            "status":"failure",
            "message":"Internal server error",
            "error":err
        })
    }
}

async function login(req,res){
    try{
        const user=await UserDetails.findOne({"email":req.body.email});
        if(!user){
            res.status(401).json({
                "status":"failure",
                "message":"User does not exist"
            })
        }
        const checkpassword=bcrypt.compare(req.body.password,user.password);
        if(!checkpassword){
            res.status(400).json({
                "status":"failure",
                "message":"Incorrect email or password"
            })
        }
        const userdetails={
            username:user.username,
            email:user.email,
            usertype:user.usertype,
            userId:user._id.toString()
        }
        const token=jwt.sign(userdetails,process.env.JWT_SECRET_KEY,{"expiresIn":"15d"});
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({
            "status":"success",
            "message":"User successfully login",
            "userdetails":userdetails,
            "token":token
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

module.exports={register,login};