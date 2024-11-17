const express=require('express')
const app=express()
const register=require('./Routes/register')
const cors=require('cors')
const path=require('path')
const multer=require('multer')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/ImagesUpload',express.static(path.join(__dirname,"ImagesUpload")))

app.use("/api",register)
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    } else if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});

app.listen(3000,() =>{
    console.log("****** server is running *********");
    
})