const express=require('express')
const router=express.Router()
const userModel=require('../Models/userData')

router.post("/register",async(req,res) =>{
    let {username,number,email,password} =req.body
    let createUser = await userModel.create({
        username:username,
        number:number,
        email:email,
        password:password
    })

    res.json({success:"Got the data"})
})
router.get("/login",async(req,res) =>{
    let finduser=await userModel.find()
    res.send("")
})

router.get('/home',async(req,res) =>{
    let getAllUser=await userModel.find()
    res.json({userData:getAllUser})
})


module.exports=router

