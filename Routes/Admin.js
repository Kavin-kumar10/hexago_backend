const express = require('express');
const Admin = require('../Schema/AdminSchema')
const router = express.Router();


router.get('/',async(req,res)=>{
    const response = await Admin.find();
    res.send(response);
})

router.post('/',async(req,res)=>{

    const {name,password,email,lat,lon,city} = req.body;
    
    try{
        const response = await Admin.create({...req.body,Schedules:[],Accepted:[],Rejected:[],Available:1})
        console.log(response);
        res.status(201).send({
            success:true,
            data:req.body
        })
    }
    catch(err){
        console.log(err);
        res.send({
            success:false,
            data:req.body,
            err:err
        })
    }
})

router.patch('/',async(req,res)=>{
    try{
        console.log(req.body);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;