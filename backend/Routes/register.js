const express=require('express')
const router=express.Router()
const upload=require('../middleware/upload')  
const jwt=require('jsonwebtoken')
const userData = require('../Models/userData')
const JWTSecretKey="THISIsmeCoolDUDEYogeshAWebDEvelopER"


router.post("/register",upload.single('image'),async(req,res) =>{

    try {
        
            let {username,email,password} =req.body
            let image=req.file ? `ImagesUpload/${req.file.filename}` : null 

            let existingUser=await userData.findOne({email})

            
            if(existingUser){
                return res.status(400).json({message:"Email Already in use"})
            }

            if(!req.file){
                return res.status(400).json({message:"Invalid file type. Only JPEG and PNG are allowed."})
            }

            const user=new userData({username,email,password,image})
            await user.save() 

            res.status(200).json({message:"User Registered Successfully"})
    } catch (error) {
            res.status(500).json({message:"Internal Server Error"})
    }

})

router.post('/login',async(req,res) =>{
    const{email,password}=req.body 
    let findUser=await userData.findOne({email})

    if(!findUser){
        return res.status(400).json({ success: false, message: "User not found" });
    }
    if (findUser.password !== password) {
        return res.status(400).json({ success: false, message: "Invalid password" });
    } 

    if(findUser.email === email && findUser.password === password){
        const data={
            user:{
                id:findUser.id
            }
        }

        const authToken=jwt.sign(data,JWTSecretKey)

        return res.json({success:true,authToken,userData:{
            username:findUser.username,
            image:findUser.image,
            id:findUser._id 
        }})
    }

})

router.get('/displaydata',async(req,res) =>{
    let allUsers=await userData.find({})
    res.status(200).json({allUsers})
})

module.exports=router

