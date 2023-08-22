const express = require("express");
const router = express.Router();
const Products = require("../Schema/ProductSchema");

router.get('/',async(req,res)=>{
    const response = await Products.find();
    res.send(response);
})


router.post('/',async (req,res)=>{
    const {username,origin,title,description,minimum,location,sellerMail,endDate,seller,finalBid,period,material,damage,additional,proof,img_url,status} = req.body;
    // res.send({
    //     UserName:username,
    //     title:title
    // })
    try{
        const response = await Products.create({...req.body,status:-1});
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

router.get('/:id',async(req,res)=>{
    try{
        const response = await Products.findById(req.params.id);
        console.log(response);
    }
    catch(err){
        console.log("not found");
    }
})

module.exports = router;