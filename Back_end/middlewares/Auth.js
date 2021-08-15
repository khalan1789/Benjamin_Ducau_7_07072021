// Required
const jwt = require("jsonwebtoken");
require("dotenv").config()
const secretToken = process.env.secretToken

//vérification de la validité du token
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretToken);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId != userId){
            throw 'Mauvais ID utilisateur !'
        }
        else{ 
            next();
        }
    }
    catch (error){
        res.status(401).json({error : "invalid token identification"
    });
    }

}