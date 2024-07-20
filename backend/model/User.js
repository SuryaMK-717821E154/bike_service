const mongoose=require('mongoose');
 
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    usertype:{
        type:String,
        default:"user"
    },
},{ timestamps: true });

const UserDetails=mongoose.model("User",userSchema);

module.exports={UserDetails};
