// multer pour les images des articles
const multer = require("multer");

const MIMES_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png"
};

const storage = multer.diskStorage({
    destination : (req, res, callback) => {
        callback(null, "articlesImages")
    },
    filename : (req, file, callback) =>{
        console.log(file)
        const name = file.originalname.split(' ').join('_'); 
        const extension = MIMES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
});

module.exports = multer({storage : storage}).single('image');