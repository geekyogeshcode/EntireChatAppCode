const express=require('express')
const app=express()
const register=require('./Routes/register')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})


app.use("/api",register)


app.listen(3000,() =>{
    console.log("****** server is running *********");
    
})