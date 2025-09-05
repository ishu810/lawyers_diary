import multer from "multer"

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/upload")
    },
    filename: function(req,file,cb){
        const filee=(`${Date.now()}-${file.originalname}`)
        cb(null,filee);
    }
});
const upload=multer({storage:storage});


const storage2=multer.diskStorage({
    // console.log();
    destination:function(req,file,cb){
        cb(null,"./public/post")
    },
    filename: function(req,file,cb){
        const filee=(`${Date.now()}-${file.originalname}`)
        cb(null,filee);
    }
})

const uploadPost=multer({storage:storage2});

export {upload,uploadPost}