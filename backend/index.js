const express=require('express');
const dotenv=require('dotenv');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const cookieParser=require("cookie-parser");
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const serviceRoutes=require('./routes/serviceRoutes');
const bookRoutes=require('./routes/bookingRoutes');
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user',userRoutes);
app.use('/service',serviceRoutes);
app.use('/booking',bookRoutes);
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        app.listen(8001,()=>{
            console.log("Port is listening 8001")
        })
    }
    catch(error){
        console.log("Db is not connected");
        console.error(error);
    }
}

connectDB();