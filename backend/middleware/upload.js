const multer=require('multer')
const path = require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname, '../ImagesUpload/'))
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() + ` - `+ file.originalname)
    }
})

const fileFilter=(req,file,cb) =>{
    const allowedType=['image/jpeg','image/png']
    if(allowedType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error ('Only JPEG and PNG images are allowed') ,false)
    }
}


const upload=multer({storage,fileFilter}) 

module.exports=upload