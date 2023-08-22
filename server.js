const express = require('express')
const cors = require('cors')
const Auth = require('./Routes/Auth')
const mongoose = require('mongoose');
const Users = require('./Schema/AuthSchema')
const multer = require('multer')
const Products = require("./Routes/Products");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Db connection
mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("unable to connect");
})


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//Routes
app.use('/Auth',Auth);
app.use('/Products',Products);


app.post('/uploads',upload.single("image"),async (req,res)=>{
    try{
        console.log(req.file);
        res.send(req.file.path);
    }
    catch(err){
        res.json(err); 
    }
})



//Home route
app.get('/',(req,res)=>{
    res.send("hi");
})

app.listen(5000,()=>{
    console.log("Running in the port");
})