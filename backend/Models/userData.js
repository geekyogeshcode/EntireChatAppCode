const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://yogeshkarware6014:yogesh7218@cluster0.vmul6.mongodb.net/NewChat?retryWrites=true&w=majority&appName=Cluster0')

const userMode=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    number:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("User",userMode)