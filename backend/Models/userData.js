const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/newChatApp')

const userMode=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model("User",userMode)